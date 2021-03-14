
import axios from 'axios';
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

const Register = ({setLoggedIn}) => {

    const history = useHistory();

    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onUsernameChange = e => {
        setUsername(e.target.value);
    };

    const onPasswordChange = e => {
        setPassword(e.target.value);
    };
    const onRePasswordChange = e => {
        setRepeatPassword(e.target.value);
    };

    const resetHandler = e => {
        setUsername('');
        setPassword('');
        setRepeatPassword('');
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== repeatPassword){
            setIsError(true);
            setErrorMessage('Passwords must match!');
            return resetHandler();
        }

        if (username.length == 0){
            setIsError(true);
            setErrorMessage('You must specify your email adress!');
            return resetHandler();
        }

        const payload = {
            username,
            password
        };

        axios({
            url: '/save/user',
            method: 'POST',
            data: payload
        })
        .catch((err) => {
            console.log(`Internal Server Error: ${err.response.data}`);
        });



        resetHandler();


        history.push('/');
        setLoggedIn(true);
    };


    const classes = "notifications";

    return (
             <div>
             <section className={isError == false ? "" : classes}>
            <p className="notification-message">{isError == false ? "" : errorMessage}</p>
        </section>
        <form className="login">
            <h1 className="login-header">Register</h1>
            <label htmlFor="email" className="login-email">Email Adress</label>
            <input id="email" type="text"  name="email" className="input-field" onChange={onUsernameChange}></input>
            <label htmlFor="password" className="login-label">Password</label>
            <input id="password" type="password" name="password"className="input-field" onChange={onPasswordChange}></input>
            <label htmlFor="password" className="re-label">Repeat Password</label>
            <input id="re-password" type="password" name="password"className="input-field" onChange={onRePasswordChange}></input>
            <button type="submit" className="signIn" onClick={onSubmit}>Create Account</button>
            <div className="login-divider">
               <span>OR</span>
            </div>
            <button className="register-btn" onClick={() => history.push('/login')}>Have an account? Sign in</button>
        </form>
        </div>
    );
};

export default Register;
