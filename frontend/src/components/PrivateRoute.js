import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './UserContext';

const PrivateRoute = ({component: Component}) => {

    const {loggedIn} = useContext(UserContext);

    return (
        <Route render={(props) => (
            loggedIn === true?
                <Component {...props} id={window.location.pathname.split('/')[2]}/>
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;