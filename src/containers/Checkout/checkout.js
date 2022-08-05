import React, { Component } from 'react';
import { Route,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/checkoutSummary';
import ContactData from './contactData/contactData';


 class checkout extends Component {
     

     continue = () => {
         this.props.history.replace({pathname:this.props.match.url + '/contact-data'});
     }
     cancel = () => {
         this.props.history.goBack();
     }

    render() {
       
       let summary = <Redirect to ="/" />;
       let purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
       if(this.props.ingredients){
           summary=(
               <div>
                   {purchaseRedirect}
                   <CheckoutSummary checkoutContinue={this.continue} checkoutCancel={this.cancel} ingredients={this.props.ingredients}/>
                    <Route 
                            path={this.props.match.url + '/contact-data'} 
                            component={ContactData}  />
                </div>
            );
       }
        return summary;
    }
}
const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased:state.orderState.purchased
    }
}

export default connect(
    mapStateToProps
)( checkout);
