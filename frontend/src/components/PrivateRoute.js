import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ loggedIn,component: Component}) => {
    return (
        <Route render={(props) => (
            loggedIn == true?
                <Component {...props} id={window.location.pathname.split('/')[2]} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;