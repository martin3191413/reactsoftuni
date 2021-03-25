import React, {useState,useEffect} from 'react';
import UserControlPanel from './UserControlPanel';
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
            .then(res => {
                setAccountInfo(res.data);
            })
            .catch(err => console.log(err));
        });

    };

    return (
        <>
        <Header setSearchInput={setSearchInput}  loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems}/>
        <UserControlPanel />
        <div className="account">
            <i className="far fa-user-circle"></i>
            <h2>Account Info</h2>
            <span className="member">mySite Member Since {moment(accountInfo.joinedAt).format('Do MMMM YYYY')}</span>
            <label htmlFor="email">Email</label>
            <input className="profile" name="email" value={accountInfo.username} disabled></input>
            <label htmlFor="email">Balance</label>
            <input className="profile-amount" value={`${accountInfo.amountMoney} $`} disabled></input>
         </div>
        <Footer />
        </>
    );
};

export default AccountInfo;
