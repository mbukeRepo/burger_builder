import React, { Component } from 'react';
import { Route,Switch,Redirect } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/logout/logout';
import { connect } from 'react-redux';
import { checkAuthState } from './store /actions/index';
import { withRouter } from 'react-router-dom'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

const asyncAuth = asyncComponent(() => import ('./containers/Auth/Auth') );

const asyncOrders = asyncComponent(() => import('./containers/Orders/orders'));
const asyncCheckout = asyncComponent(() => import("./containers/Checkout/checkout"));

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoLogin();
  }
  render () {
    let routes = (
          <Switch>
            <Route path="/auth" component={asyncAuth} />
            <Route path= "/" component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
    );
    if(this.props.isAuthenticated){
      routes=(
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path= "/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
      
    );
  }
}
// getting the universal state as the props of this component
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
// dispatching action creators
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin : () => dispatch(checkAuthState()) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( withRouter(App)) ;
