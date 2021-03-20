import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const AccountInfo = ({loggedIn, setLoggedIn, cartItems, setCartItems, setSearchInput}) => {

    const [accountInfo, setAccountInfo] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const token = localStorage.getItem('userId');

        jwt.verify(token, 'mySecretSecret', function(err,data){
            if (err){
                console.log(err);
            }
            axios({
                method: 'GET',
                url: `/api/user/${data.id}`
            })
            .then(res => setAccountInfo(res.data))
            .catch(err => console.log(err));
        });
    };

    return (
        <>
        <Header setSearchInput={setSearchInput}  loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems}/>
        <div className="account">
            <i className="far fa-user-circle"></i>
            <h2>Account Info</h2>
            <Link to="/orders">Orders</Link>
            <label htmlFor="email">Email</label>
            <input className="input-field profile" name="email" value={accountInfo.username} disabled></input>
            <label htmlFor="email">Balance</label>
            <input className="input-field profile-amount" value={`${accountInfo.amountMoney} $`} disabled></input>
            <input value={`mySite Member Since ${moment(accountInfo.joinedAt).format('Do MMMM YYYY')}`}></input>
        </div>
        <Footer />
        </>
    );
};

export default AccountInfo;
