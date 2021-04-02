import React, {useContext} from 'react';
import {UserContext} from '../UserContext';
import Login from '../Login';
import {Route, Redirect} from 'react-router-dom';

const LoginContainer = () => {

    const {loggedIn} = useContext(UserContext);

    return (
        <Route render={(props) => (
            loggedIn === false?
                <Login {...props}/>
            : <Redirect to="/" />
        )} />
    );
};

export default LoginContainer;
