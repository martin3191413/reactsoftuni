import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ loggedIn, setLoggedIn,component: Component, cartItems, setCartItems}) => {
    return (
        <Route render={(props) => (
            loggedIn === true?
                <Component {...props} id={window.location.pathname.split('/')[2]} cartItems={cartItems} setCartItems={setCartItems} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;