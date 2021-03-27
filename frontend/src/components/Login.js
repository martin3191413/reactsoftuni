import axios from 'axios';
import React, {useState, useContext} from 'react';
import {UserContext} from './UserContext';
import { useHistory, Link } from 'react-router-dom';

const Login = () => {

    const history = useHistory();
    const classes = 'notifications';

    const {setLoggedIn} = useContext(UserContext);
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
        .then((res) => {
            localStorage.setItem('userId', res.data);
            localStorage.setItem('userEmail', username);
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
                 setTimeout(() => {
                    setIsError(false);
                }, 5000);
                 return;
            }
            else{
                setErrorMessage(err.response.data);
                 resetHandler();
                 setTimeout(() => {
                    setIsError(false);
                }, 5000);
                 return;
            }
        });
    };


    return (
        <>
        <div className="logo">
                <Link to="/" className="login-logo"><span className="link-logo">mySite</span></Link>
            </div>
        <div>
            <section className={isError === false ? '' : classes}>
            <p className="notification-message">{isError === false ? '' : errorMessage}</p>
        </section>
            <form className="login">
            <h1 className="login-header">Sign In</h1>
            <label htmlFor="email" className="login-email">Email Adress</label>
            <input id="email" type="text"  name="email" className="input-field" value={username} onChange={onChangeUsername}></input>
            <label htmlFor="password" className="login-label">Password</label>
            <input id="password" type="password" autoComplete="off" name="password"className="input-field" value={password} onChange={onChangePassword}></input>
            <button type="submit" className="signIn" onClick={submitHandler}>Sign In</button>
            <div className="login-divider">
               <span>OR</span>
            </div>
            <button className="register-btn" onClick={() => history.push('/register')}>Create Account</button>
        </form>
        </div>
        </>
    );
};

export default Login;
