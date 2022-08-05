import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';
const initialState = {
    orders: [],
    loading:false,
    purchased:false
};
const purchaseBurgerSuccess = (state,action) => {
    let newOrder = {
        ...action.orderData,
        id:action.id
    }
    let updatedOrders = {
        loading:false,
        orders: state.orders.concat(newOrder),
        purchased:true
    }
    return updatedObject(state,updatedOrders)
}
const orderReducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.FETCH_ORDERS_START: return updatedObject(state,{loading:true})
        case actionTypes.FETCH_ORDERS_SUCCESS: return updatedObject(state,{ orders: action.orders,loading:false})
        case actionTypes.FETCH_ORDERS_FAIL: return updatedObject(state,{loading:false})
        case actionTypes.PURCHASE_INIT: return updatedObject(state,{purchased:false})
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action)
        case actionTypes.PURCHASE_BURGER_START: return updatedObject(state,{loading:true})   
        case actionTypes.PURCHASE_BURGER_FAILED:
            return updatedObject(state,{loading:false})
        default:
            return state ;
    }
}
export default orderReducer;
