import React, {useContext} from 'react';
import {UserContext} from '../UserContext';
import Register from '../Register';
import {Route, Redirect} from 'react-router-dom';

const RegisterContainer = () => {

    const {loggedIn} = useContext(UserContext);

    return (
        <Route render={(props) => (
            loggedIn === false?
                <Register {...props}/>
            : <Redirect to="/" />
        )} />
    );
};

export default RegisterContainer;