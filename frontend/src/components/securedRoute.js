import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const securedRoute = ({component: Component, loggedIn}) => {
    return (
        <Route render={(props) => (
            loggedIn == true ? 
            <Redirect to="/" /> :
            <Component {...props} />
        )}/>
    );
}
;
export default securedRoute;
