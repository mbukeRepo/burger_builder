import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import classes from './contactData.css';
import axios from '../../../axios-orders';
import Spiner from '../../../components/UI/Spiner/Spiner';
import {withRouter} from 'react-router-dom';
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/WithErrorHandler';
import { purchaseBurger } from '../../../store /actions/index'
import { updatedObject,checkValidity } from '../../../shared/utility';


class contactData extends Component {
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your name',
                },
                value:'',
                validation:{
                    required:true 
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true 
                },
                valid:false,
                touched:false
            },
            zipCode : {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP CODE'
                },
                value:'',
                validation:{
                    required:true ,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your email'
                },
                value:'',
                validation:{
                    required:true 
                },
                valid:false,
                touched:false
            },
            deriverMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                validation:{},
                value:'',
                valid:true
            } 
        },
        formIsValid:false,
        loading:false
    }
    checkValidity=(value,rules) => {
        let isValid = true;
        if(rules.required){
            isValid = (value.trim() !== '') && isValid;
        }
        if(rules.minLength){
            isValid = (value.length >= rules.minLength) && isValid;
        }
        if(rules.maxLength){
            isValid = (value.length <= rules.maxLength) && isValid;
        }
        return isValid;
    }
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formDataIdentifier in this.state.orderForm){
            formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value;
        }
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.totalprice,
            userId: this.props.userId,
            orderData:{
                ...formData
            }
        }
        this.props.onOrderSubmit(order,this.props.token);
        
        // axios.post('/order.json',order)
        // .then(res => {
        //     this.setState({loading:false});
        //     this.props.history.push('/');
        // })
        // .catch(err => {
        //     this.setState({loading:false});
        // });
    }
    inputChangedHandler = (event,inputId) => {
        
        let updatedElement = updatedObject(this.state.orderForm[inputId],{
            value:event.target.value,
            valid:checkValidity(event.target.value,this.state.orderForm[inputId].validation),
            touched: true
        });
        let updatedOrderForm = updatedObject(this.state.orderForm,{
            [inputId]: updatedElement
        });
        let formisValid = true;
        for(let element in updatedOrderForm){
            formisValid = updatedOrderForm[element].valid && formisValid;
        }
        
        this.setState({orderForm:updatedOrderForm,formIsValid:formisValid});
    }
    render() {
        let formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({id:key,config:this.state.orderForm[key]});
        }
        let form=(
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(input => (
                            <Input 
                                elementtype={input.config.elementType} 
                                elementconfig={input.config.elementConfig} 
                                value={input.config.value}
                                key={input.id}
                                name={input.id}
                                invalid = {!input.config.valid}
                                shouldValidate={input.config.validation}
                                touched={input.config.touched}
                                changed={(event) => this.inputChangedHandler(event,input.id)} />))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
            );
        if(this.props.loading){
            form =<Spiner />
        }
        return (
            
            <div className={classes.ContactData}>
                
                    
                     <h4>Enter your contact data</h4> 
                    {form}     
                     
              
            </div>
        )
    }
}
const mapStateToProps  = state => {
    return {
        ingredients:state.burgerBuilder.ingredients,
        totalprice:state.burgerBuilder.totalPrice,
        loading:state.orderState.loading,
        token:state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onOrderSubmit : (order,token) => dispatch(purchaseBurger(order,token))
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(withRouter(contactData),axios))
