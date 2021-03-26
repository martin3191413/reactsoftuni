
import {Route,Redirect} from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, ...rest}) => {

    return (
        <Route {...rest} render={props => (
            restricted === false?
               <Component {...props} {...rest}/>
            : <Redirect to="/"/>
        )} />
    );
};

export default PublicRoute;