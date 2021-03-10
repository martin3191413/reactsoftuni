import React from 'react';
import {Route,Redirect} from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, data}) => {
    return (
        <Route render={props => (
            restricted == false?
               <Component {...props} data={data} />
            : <Redirect to="/"/>
        )} />
    );
};

export default PublicRoute;