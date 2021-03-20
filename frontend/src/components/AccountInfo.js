import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import jwt from 'jsonwebtoken';

const AccountInfo = ({loggedIn, setLoggedIn, cartItems, setCartItems, setSearchInput, accountInfo}) => {

    return (
        <>
        <Header setSearchInput={setSearchInput}  loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems}/>
        <div className="account">
            <i className="far fa-user-circle"></i>
            <h2>Account Info</h2>
            <Link to="/orders">Orders</Link>
            <label htmlFor="email">Email</label>
            <input className="input-field profile" name="email" value={accountInfo.username} disabled></input>
            <input className="input-field profile-amount" value={accountInfo.amountMoney} disabled></input>
        </div>
        <Footer />
        </>
    );
};

export default AccountInfo;