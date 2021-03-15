import axios from 'axios';
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

const Login = ({setLoggedIn}) => {

    const history = useHistory();
    const classes = "notifications";

    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const resetHandler = () => {
        setUsername('');
        setPassword('');
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (!username || !password){
            setIsError(true);
            setErrorMessage('Invalid username or password!');
            resetHandler();
            return;
        }

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
        })
        .catch((err) => {
            setIsError(true);
            const message = err.response.data;
            if (message.includes('User validation')){
                const needed = err.response.data.split(':')[2];
                setErrorMessage(needed);
                 resetHandler();
                 return;
            }
            else{
                setErrorMessage(err.response.data);
                 resetHandler();
                 return;
            }
        });
    };


    return (
        <div>
            <section className={isError == false ? "" : classes}>
            <p className="notification-message">{isError == false ? "" : errorMessage}</p>
        </section>
            <form className="login">
            <h1 className="login-header">Sign In</h1>
            <label for="email" className="login-email">Email Adress</label>
            <input id="email" type="text"  name="email" className="input-field" value={username} onChange={onChangeUsername}></input>
            <label for="password" className="login-label">Password</label>
            <input id="password" type="password" name="password"className="input-field" value={password} onChange={onChangePassword}></input>
            <button type="submit" className="signIn" onClick={submitHandler}>Sign In</button>
            <div className="login-divider">
               <span>OR</span>
            </div>
            <button className="register-btn" onClick={() => history.push('/register')}>Create Account</button>
        </form>
        </div>
    );
};

export default Login;
