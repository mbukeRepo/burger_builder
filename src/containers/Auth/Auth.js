import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import { authenticate, setAuthRedireactPath } from '../../store /actions/index'
import Spiner from '../../components/UI/Spiner/Spiner';
import { updatedObject,checkValidity } from '../../shared/utility';

export class Auth extends Component {
    state = {
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'your email',
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'your password',
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },
        isSignUp:true
    }
    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath('/');
        }
    }

    inputChangedHandler = (event,controlName) => {
        const updatedControls = updatedObject(this.state.controls,{
            [controlName]:updatedObject(this.state.controls[controlName],{
                value:event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            })});
          
        this.setState({controls:updatedControls});
    }
    submitHandler = (event) => {
        event.preventDefault();

        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
        
    }
    switchAuthModeHandler = () => {
        this.setState({isSignUp: !this.state.isSignUp});
    }
    render() {
        let formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({id:key,config:this.state.controls[key]});
        }
        let form = formElementsArray.map(input => {
            return <Input  elementtype={input.config.elementType} 
                           elementconfig={input.config.elementConfig} 
                           value={input.config.value}
                           key={input.id}
                           name={input.id}
                           invalid = {!input.config.valid}
                           shouldValidate={input.config.validation}
                           touched={input.config.touched}
                           changed={(event) => this.inputChangedHandler(event,input.id)}  />
        });
        let redirect = null;
        if (this.props.isAuthenticated){
            redirect = <Redirect to={this.props.authRedirectPath}  />
        }
       
        return (
            <div className={classes.Auth}>
                {redirect}
                {
                    this.props.loading ? <Spiner/> : (
                        <React.Fragment>
                        {this.state.isSignUp ? <h3>REGISTER YOUR ACCOUNT</h3> : <h3>SIGN IN </h3>}
                        <form onSubmit={this.submitHandler}>
                            {form}
                            <Button btnType="Success">{this.state.isSignUp ? 'sign up':'Sign in' }</Button> 
                        </form>
                         <Button btnType="Danger" clicked={this.switchAuthModeHandler}>switch to {this.state.isSignUp ? 'Sign in' : 'sign up'}</Button>
                    
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    isAuthenticated : state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
})

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email,password,isSignUp) =>  dispatch(authenticate(email,password,isSignUp)),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedireactPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
