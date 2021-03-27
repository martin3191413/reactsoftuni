import React, {useState, useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import UserControlPanel from './UserControlPanel';
import axios from 'axios';
import jwt from 'jsonwebtoken';


const UserSettings = () => {

    const [orderNumber, setOrderNumber] = useState('');
    const [refunds, setRefunds] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getRefunds();
    }, []);

    const getRefunds = () => {
        const token = localStorage.getItem('userId');

        jwt.verify(token, 'mySecretSecret', function(err,data){
            if (err){
                console.log(err);
            };
           
            axios({
                method: "GET",
                url: `/api/user/${data.id}`
            })
            .then(res => setRefunds(res.data.refunds))
            .catch(err => console.log(err));
        });
    };

    const refundHandler = (e) => {

        e.preventDefault();

        const payload = {
            orderNumber
        };

        axios({
            method: "POST",
            url: `/api/orders/refund/${orderNumber}`,
            data: payload
        })
        .then(res => {
            getRefunds();
            setOrderNumber('');
            setErrorMessage('Your order has been refunded successfully!');

            setTimeout(() => {
                setErrorMessage('');
            }, 4000);
        })
        .catch(err => {
            setErrorMessage(err.response.data);
            setOrderNumber('');
        });
    };

    const refundsMessage = <span className="refunds-msg">You have only {refunds} remaining {refunds > 1 ? 'refunds' : 'refund'}!</span>;
    const nonRefundsMesasge = <span className="refunds-msg">You have no refunds left!</span>;

    return (
        <>
        <Header/>
        <UserControlPanel />
        <div className="user-settings">
            <form className="refund-form">
                <span className="error-msg">{errorMessage}</span>
                <label htmlFor="refund" className="refund-label">Refund</label>
                <input className="input-field order-refund" type="text" name="refund" disabled={refunds === 0 ? true : false} placeholder="#Order Id" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)}></input>
                <button onClick={(e) => refundHandler(e)} disabled={refunds === 0 ? true : false}>Refund</button>
                {refunds !== 0 ? refundsMessage : nonRefundsMesasge}
            </form>            
        </div>
        <Footer />
        </>
    );
};

export default UserSettings;
