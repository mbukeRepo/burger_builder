import  * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess =  (id,orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id:id,
        orderData:orderData
    }
}
export const purchaseBurgerFailed = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_FAILED,
        
    }
}
export const purchaseBurgerStart = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}
export const purchaseBurger = (order,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/order.json?auth='+token,order)
        .then(res => {
            dispatch(purchaseBurgerSuccess(res.data.id,order));

        })
        .catch(err => {
            dispatch(purchaseBurgerFailed(err));
        });
    }
}

export const fetchOrderSuccess = (orders) => {
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrderFail = (error) => {
    return{
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}
export const fetchOrderStart = () => {
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('order.json'+queryParams)
        .then(res => {
            const fetchedOrders =[];
            for (let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch(err => dispatch(fetchOrderFail(err)));
    }
}