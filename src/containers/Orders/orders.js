import React, { Component } from 'react';
import { connect } from 'react-redux'
import Order from '../../components/Order/order';
import axios from '../../axios-orders'
import Spiner from '../../components/UI/Spiner/Spiner';
import withErrorHandler from '../../hoc/WithErrorHandler';
import { fetchOrders } from '../../store /actions/index'

class orders extends Component {
    
    componentDidMount(){
       this.props.onFetchOrders(this.props.token,this.props.userId);
    }
    render() {
        let orders = <Spiner/>;
        if(!this.props.loading){
             orders = this.props.orders.map(order => <Order ingredients={order.ingredients} key={order.id} price={+order.price} />)     
        }
       
        return (
            <div>
               {orders}
            </div>
        )
    }
}

const mapStateToProps  = (state) => {
    return {
        orders:state.orderState.orders,
        loading : state.orderState.loading,
        token: state.auth.token,
        userId : state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token,userId) => dispatch(fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( orders,axios)) 
