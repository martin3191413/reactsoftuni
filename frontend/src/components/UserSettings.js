import React, {useState, useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import UserControlPanel from './UserControlPanel';
import axios from 'axios';
import LoadingBar from './LoadingBar';
import jwt from 'jsonwebtoken';


const UserSettings = () => {

    const [orderNumber, setOrderNumber] = useState('');
    const [refunds, setRefunds] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [className, setClassName] = useState('');

    useEffect(() => {
        getRefunds();
    }, []);

    const getRefunds = () => {
        setLoading(true);
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

        setLoading(false);
    };

    const refundHandler = (e) => {

        e.preventDefault();

        const payload = {
            orderNumber
        };

        if (orderNumber === ''){
            setErrorMessage('Invalid Number Order!');
            setClassName('error-msg');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);

            return;
        }

        axios({
            method: "POST",
            url: `/api/orders/refund/${orderNumber}`,
            data: payload
        })
        .then(res => {
            getRefunds();
            setOrderNumber('');
            setErrorMessage('Your order has been refunded successfully!');
            setClassName('successfull-msg');

            setTimeout(() => {
                setErrorMessage('');
            }, 4000);
        })
        .catch(err => {
            setErrorMessage(err.response.data);
            setClassName('error-msg');
            setOrderNumber('');
        });
    };

    const refundsMessage = <span className="refunds-msg">You have only {refunds} remaining {refunds > 1 ? 'refunds' : 'refund'}!</span>;
    const nonRefundsMesasge = <span className="refunds-msg">You have no refunds left!</span>;

    const settings = <div className="user-settings">
    <form className="refund-form">
        <span className={className}>{errorMessage}</span>
        <label htmlFor="refund" className="refund-label">Refund</label>
        <input className="input-field order-refund" type="text" name="refund" disabled={refunds === 0 ? true : false} placeholder="#Order Number" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)}></input>
        <button onClick={(e) => refundHandler(e)} className="refund-btn" disabled={refunds === 0 ? true : false}>Refund</button>
        {refunds !== 0 ? refundsMessage : nonRefundsMesasge}
    </form>
    <div className="edit-password">
        <label htmlFor="password" className="edit-password">Password</label>
        <input className="input-field edit-passwordInput" type="password" disabled='true' value="**********"></input>
        <button className=" edit-password-btn">Edit</button>
    </div>
    <div className="delete-acc">
    <span className="delete-acc-span">Delete Account</span>
    <button className="delete-acc-btn">Delete</button>
    </div>            
    </div>;

    return (
        <>
        <Header/>
        <UserControlPanel />
        {loading === true ? <LoadingBar /> : settings}
        <Footer />
        </>
    );
};

export default UserSettings;
