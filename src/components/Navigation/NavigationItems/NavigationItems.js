import React from 'react';
import { useSelector } from 'react-redux'
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
    const isAuth = useSelector(state => state.auth.token !== null)
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
            {isAuth ? <NavigationItem link="/logout">Logout</NavigationItem> : 
                      <NavigationItem link="/auth">Authenticate</NavigationItem>
            }
        </ul>
        );
}

export default navigationItems;