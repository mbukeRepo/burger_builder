import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spiner from '../../components/UI/Spiner/Spiner';
import withErrorHandler from '../../hoc/WithErrorHandler';
import { addIngredient,removeIngredient,initIngredients,purchaseInit,setAuthRedireactPath } from '../../store /actions/index'





class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {

        purchasing: false,
        loading : false,
        error: false
    }
    componentDidMount(){
        
        this.props.onInitIngredients();
        
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return  sum > 0 ;
    }
    // incrementing the ingredients of the burger
   
    // responsible for showing the modal 
    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
        
    }

    // cancel the purchasing
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }


    // order handler 
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname:'/checkout'});
    }

    render () {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary =  null;
       
        let burger = this.props.error ? <p>something went wrong</p> :  <Spiner/>;
        if(this.props.ingredients){
            burger = <Aux>
                        <Burger ingredients={this.props.ingredients} />
                        <BuildControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            purchasable={this.updatePurchaseState(this.props.ingredients)}
                            ordered={this.purchaseHandler}
                            price={this.props.totalPrice} />
                    </Aux>;
            orderSummary = <OrderSummary 
                                ingredients={this.props.ingredients}
                                price={this.props.totalPrice}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler} />;
        }
      
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return{
        ingredients:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
        onInitIngredients: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(setAuthRedireactPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))  ;