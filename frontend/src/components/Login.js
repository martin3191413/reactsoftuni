import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Router } from 'react-router-dom';

const Login = () => {

    return (
        <div>
        <Header />
        <div>
        <form className="login"  method="POST">
            <h1>Login</h1>

            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="Username.." name="username"></input>

            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Password.." name="password"></input>

            <button type="submit">Login</button>
        </form>
        </div>
        <Footer />
        </div>
    );
};

export default Login;
