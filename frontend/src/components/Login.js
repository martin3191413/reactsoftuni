import axios from 'axios';
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

const Login = () => {

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
        } );
    };

    return (
        <div>
            <form className="login">
            <h1>Login</h1>
            <i className="fa fa-user icon"></i>
            <input id="username" type="text" placeholder="Username" name="username" className="input-field" onChange={onChangeUsername}></input>
            <i className="fas fa-lock"></i>
            <input id="password" type="password" placeholder="Password" name="password"className="input-field" onChange={onChangePassword}></input>
            <span className="underline"></span>
            <button type="submit" className="signIn" onClick={submitHandler}>SIGN IN</button>
        </form>
        </div>
    );
};

export default Login;
