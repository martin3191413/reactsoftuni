import React, {useState,useEffect} from 'react';
import UserControlPanel from './UserControlPanel';
import LoadingBar from './LoadingBar';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const AccountInfo = () => {

    const [accountInfo, setAccountInfo] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = () => {
        setLoading(true);
        const token = localStorage.getItem('userId');

        jwt.verify(token, 'mySecretSecret', function(err,data){
            if (err){
                console.log(err);
            }
            console.log(data);
            axios({
                method: 'GET',
                url: `/api/user/${data.id}`
            })
            .then(res => {
                setAccountInfo(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
        });

    };

    const account =  <div className="account">
    <i className="far fa-user-circle"></i>
    <h2>Account Info</h2>
    <span className="member">mySite Member Since {moment(accountInfo.joinedAt).format('Do MMMM YYYY')}</span>
    <label htmlFor="email">Email</label>
    <input className="profile" name="email" value={accountInfo.username} disabled></input>
    <label htmlFor="email">Balance</label>
    <input className="profile-amount" value={`${accountInfo.amountMoney} $`} disabled></input>
 </div>;

    return (
        <>
        <Header/>
        <UserControlPanel />
        {loading === true ? <LoadingBar /> : account}
        <Footer />
        </>
    );
};

export default AccountInfo;
