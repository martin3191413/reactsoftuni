import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ loggedIn, setLoggedIn,component: Component, cartItems, setCartItems, userFavItems, setUserFavItems, accountInfo, setAccountInfo}) => {
    return (
        <Route render={(props) => (
            loggedIn === true?
                <Component {...props} id={window.location.pathname.split('/')[2]}  accountInfo={accountInfo} setAccountInfo={setAccountInfo} userFavItems={userFavItems} setUserFavItems={setUserFavItems} cartItems={cartItems} setCartItems={setCartItems} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;