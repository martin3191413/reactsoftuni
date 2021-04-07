import React, {useContext, useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import {PaymentContext} from './PaymentContext';
import axios from 'axios';

const SuccessfullOrder = () => {

    const {confirmed} = useContext(PaymentContext);

    useEffect(() => {
        const payload = {
            userEmail: confirmed.userOrderEmail,
            orderId: confirmed.orderId
        };
    
        axios({
            method: 'post',
            url: '/api/email',
            data: payload
            
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <>
        <Header />
        <h2 className="successfull-order">Your order has been accepted! Check {confirmed.userOrderEmail} for more information about Order N#{confirmed.orderId}!</h2>
        <Footer />
        </>
    );
};

export default SuccessfullOrder;
