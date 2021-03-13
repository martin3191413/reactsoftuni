import axios from 'axios';
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

const Login = ({setLoggedIn}) => {

    const history = useHistory();

    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const payload = {
            username,
            password
        };

        axios({
            url: 'api/login',
            method: 'POST',
            data: payload
        })
        .then((response) => {
            localStorage.setItem('userId', response.data);
            history.push('/');
            setLoggedIn(true);
        } );
    };


    return (
        <div>
            <form className="login">
            <h1 className="login-header">Sign In</h1>
            <label for="email" className="login-email">Email Adress</label>
            <input id="email" type="text"  name="email" className="input-field" onChange={onChangeUsername}></input>
            <label for="password" className="login-label">Password</label>
            <input id="password" type="password" name="password"className="input-field" onChange={onChangePassword}></input>
            <button type="submit" className="signIn" onClick={submitHandler}>SIGN IN</button>
            <div className="login-divider">
               <span>OR</span>
            </div>
            <button className="register-btn" onClick={() => history.push('/register')}>Create Account</button>
        </form>
        </div>
    );
};

export default Login;
