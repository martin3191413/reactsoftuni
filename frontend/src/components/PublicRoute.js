import React from 'react';
import {Route,Redirect} from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, data, setLoggedIn, setCartItems, cartItems}) => {
    return (
        <Route render={props => (
            restricted == false?
               <Component {...props} data={data} setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems} />
            : <Redirect to="/"/>
        )} />
    );
};

export default PublicRoute;