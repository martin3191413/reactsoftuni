import React, {useContext} from 'react';
import Header from './Header';
import Footer from './Footer';
import {PaymentContext} from './PaymentContext';

const SuccessfullOrder = () => {

    const {confirmed} = useContext(PaymentContext);

    return (
        <>
        <Header />
        <h2 className="successfull-order">Your order has been accepted! Check {confirmed.userOrderEmail} for more information!</h2>
        <Footer />
        </>
    );
};

export default SuccessfullOrder;
