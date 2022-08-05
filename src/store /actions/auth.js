import * as actionTypes from './actionTypes';
import axios from 'axios'
export const authStart = () => {
    return{
        type:actionTypes.AUTH_START
    }
}
export const authSucess = (token,userId) => {
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}
export const authFail = (error) => {
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        },expirationTime * 1000 );
    }
}
export const authenticate = (email,password,isSignUp,history) => {
    return dispatch => {
        dispatch(authStart());
        const reqBody ={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGxRV79yP7ojSI1m091x0kj-TeBH-Z0yM';
        if(!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGxRV79yP7ojSI1m091x0kj-TeBH-Z0yM';
        }
        axios.post(url,reqBody)
        .then(response => {
            
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('userId',response.data.localId);
            const expirationDate = new Date( new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSucess(response.data.idToken,response.data.localId));
            history.replace('/');
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error => {
            
            dispatch(authFail(error))
        })
    }
}
export const setAuthRedireactPath = (path) => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}
export const checkAuthState = () => {
    return dispatch => {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
        
        if(token){
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(new Date() >= expirationDate){
                dispatch(logout());
                
            }else{
                
                dispatch(authSucess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ))
            }
            
        }else{
            dispatch(logout());
        }
    }
}