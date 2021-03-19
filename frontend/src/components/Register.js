
import axios from 'axios';
import React, {useState} from 'react';
import { useHistory, Link } from "react-router-dom";

const Register = ({setLoggedIn}) => {

    const history = useHistory();

    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [amountMoney, setAmountMoney] = useState(0);
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

    const onAmountChange = (e) => {
        if (e.target.value < 0){
            return;
        }
        setAmountMoney(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== repeatPassword){
            setIsError(true);
            setErrorMessage('Passwords must match!');
             resetHandler();
             return;
        }

        if (!username){
            setIsError(true);
            setErrorMessage('You must specify your email adress!');
             resetHandler();
             return;
        }

        const payload = {
            username,
            password,
            amountMoney
        };


     
            axios({
                url: '/save/user',
                method: 'POST',
                data: payload
            })
            .then((res) => {
                console.log(res);
                history.push('/');
                setLoggedIn(true);
                localStorage.setItem('userEmail', username);
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


    const classes = "notifications";

    return (
        <>
        <div className="logo">
                <Link to="/" className="register-logo"><span className="link-logo">mySite</span></Link>
            </div>
             <div>
             <section className={isError === false ? "" : classes}>
            <p className="notification-message">{isError === false ? "" : errorMessage}</p>
        </section>
        <form className="login">
            <h1 className="login-header">Register</h1>
            <label htmlFor="email" className="login-email">Email Address</label>
            <input id="email" type="text"  name="email" className="input-field" value={username} onChange={onUsernameChange}></input>
            <label htmlFor="password" className="login-label">Password</label>
            <input id="password" type="password" name="password"className="input-field" value={password} onChange={onPasswordChange}></input>
            <label htmlFor="password" className="re-label">Repeat Password</label>
            <input id="re-password" type="password" name="password"className="input-field" value={repeatPassword} onChange={onRePasswordChange}></input>
            <label htmlFor="amount-money" className="amount-label">Amount on Account ($)</label>
            <input id="amount-money" type="number" name="amount-money"className="input-field" value={amountMoney} onChange={(e) => onAmountChange(e)}></input>
            <button type="submit" className="signIn" onClick={onSubmit}>Create Account</button>
            <div className="login-divider">
               <span>OR</span>
            </div>
            <button className="register-btn" onClick={() => history.push('/login')}>Have an account? Sign in</button>
        </form>
        </div>
        </>
    );
};

export default Register;
