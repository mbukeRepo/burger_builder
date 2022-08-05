import * as actions from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility'
const initialState ={
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath: '/'
}

const authSuccess = (state,action) => {
    return updatedObject(state,{
        token:action.token,
        userId:action.userId,
        loading:false,
        error:null});
}

const logout = (state,action) => {
    return updatedObject(state,{
        token:null,
        userId:null
    })
}
const setAuthRedirectPath = (state,action) => {
    return updatedObject(state,{authRedirectPath:action.path});
}
const authReducer = (state=initialState,action) => {
    switch(action.type){
        case actions.AUTH_START: return  updatedObject(state,{loading:true,error:null})
        case actions.AUTH_SUCCESS: return authSuccess(state,action)
        case actions.AUTH_FAIL: return updatedObject(state,{loading:false,error:action.error})
        case actions.LOGOUT: return logout(state,action);
        case actions.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default: return state;
    }
}
export default authReducer;