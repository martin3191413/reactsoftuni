import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { MDBInput } from "mdbreact";

const Login = () => {

    return (
        <div>
            <Header />
            <form className="login"  method="POST">
            <h1>Login</h1>
            <i className="fa fa-user icon"></i>
            <input id="username" type="text" placeholder="Username" name="username" className="input-field"></input>
            <i class="fas fa-lock"></i>
            <input id="password" type="password" placeholder="Password" name="password"className="input-field"></input>
            <span className="underline"></span>
            <button type="submit" className="signIn">SIGN IN</button>
        </form>
        <Footer />
        </div>
    );
};

export default Login;
