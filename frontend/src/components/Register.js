
import axios from 'axios';
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

const Register = ({loggedIn,setLoggedIn}) => {

    const history = useHistory();

    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isError, setIsError] = useState(false);

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
           return setIsError(true);
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
            console.log(`Internal Server Error: ${err}`);
        });



        resetHandler();


        history.push('/');
        setLoggedIn(true);

    };

    const isErrorMessage = "Passwords must match!";
    const classes = "notifications";

    return (
             <div>
             <section className={isError == false ? "" : classes}>
            <p className="notification-message">{isError == false ? "" : isErrorMessage}</p>
        </section>
            <form className="register">
            <h1>Register</h1>
            <i className="fa fa-user icon"></i>
            <input id="username" type="text" placeholder="Username" name="username" className="input-field" value={username} onChange={onUsernameChange}></input>
            <i className="fas fa-lock"></i>
            <input id="password" type="password" placeholder="Password" name="password"className="input-field" value={password} onChange={onPasswordChange}></input>
            <i className="fas fa-lock"></i>
            <input id="re-password" type="password" placeholder="Re-Password" name="re-password"className="input-field register-re-password" value={repeatPassword} onChange={onRePasswordChange}></input>
            <button type="submit" className="registerBtn" onClick={onSubmit}>Register</button>
        </form>
        </div>
    );
};

export default Register;
