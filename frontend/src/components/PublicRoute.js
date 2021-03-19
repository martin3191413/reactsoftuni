import React from 'react';
import {Route,Redirect} from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, data, loggedIn, setLoggedIn, setCartItems, cartItems, menShoes, setUserCredentials, setSearchInput}) => {
    return (
        <Route render={props => (
            restricted === false?
               <Component {...props} data={data} setLoggedIn={setLoggedIn} loggedIn={loggedIn} setCartItems={setCartItems} cartItems={cartItems} menShoes={menShoes} setSearchInput={setSearchInput} setUserCredentials={setUserCredentials} />
            : <Redirect to="/"/>
        )} />
    );
};

export default PublicRoute;