import React from 'react';
import {Route,Redirect} from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, data, setLoggedIn, setCartItems, cartItems, menShoes}) => {
    return (
        <Route render={props => (
            restricted == false?
               <Component {...props} data={data} setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems} menShoes={menShoes} />
            : <Redirect to="/"/>
        )} />
    );
};

export default PublicRoute;