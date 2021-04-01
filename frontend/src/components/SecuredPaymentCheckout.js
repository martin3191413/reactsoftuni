import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {PaymentContext} from './PaymentContext';

const SecuredPaymentCheckout = ({component: Component}) => {

    const {confirmed} = useContext(PaymentContext);

    return (
        <Route render={(props) => (
            confirmed.confirmedOrder === true?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default SecuredPaymentCheckout;
