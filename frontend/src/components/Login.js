import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Login = () => {

    return (
        <div>
            <form className="login">
            <h1>Login</h1>
            <i className="fa fa-user icon"></i>
            <input id="username" type="text" placeholder="Username" name="username" className="input-field"></input>
            <i class="fas fa-lock"></i>
            <input id="password" type="password" placeholder="Password" name="password"className="input-field"></input>
            <span className="underline"></span>
            <button type="submit" className="signIn">SIGN IN</button>
        </form>
        </div>
    );
};

export default Login;
