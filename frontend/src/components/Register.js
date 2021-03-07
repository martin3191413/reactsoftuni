import axios from 'axios';
import React, {useState} from 'react';

const Register = () => {

    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

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
        setUsername("");
        setPassword("");
        setRepeatPassword("");
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== repeatPassword){
           return console.log('Invalid passwords');
           
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
    };

    return (
             <div>
            <form className="register">
            <h1>Register</h1>
            <i className="fa fa-user icon"></i>
            <input id="username" type="text" placeholder="Username" name="username" className="input-field" value={username} onChange={onUsernameChange}></input>
            <i class="fas fa-lock"></i>
            <input id="password" type="password" placeholder="Password" name="password"className="input-field" value={password} onChange={onPasswordChange}></input>
            <input id="re-password" type="password" placeholder="Re-Password" name="re-password"className="input-field" value={repeatPassword} onChange={onRePasswordChange}></input>
            <button type="submit" className="signIn" onClick={onSubmit}>Register</button>
        </form>
        </div>
    );
};

export default Register;
