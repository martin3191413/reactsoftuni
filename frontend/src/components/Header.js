import React from 'react';
import {Link} from 'react-router-dom';

const Header = ({loggedIn, setLoggedIn}) => {

    const logout = () => {
        localStorage.clear();
        setLoggedIn(false);
        window.location.href = '/';
    };

    return (
        <nav>
            <div className="logo">
                mySite
            </div>
            <ul>
                <Link className="a-header" to="/">
                <li>Home</li>
                </Link>
                <Link className="a-header" to="/men">
                <li>Men</li>
                </Link>
                <Link className="a-header" to="/women">
                <li>Women</li>
                </Link>
                <Link className="a-header"   to="/about">
                <li>About</li>
                </Link>
                <Link className="a-header" to="/contacts">
                <li>Contacts</li>
                </Link>
                {loggedIn == false ?<Link className="a-header" to="/register">
                <li>Register</li>
                </Link> : ""}
                {loggedIn == false ?<Link className="a-header" to="/login">
                <li>Login</li>
                </Link> : ""}
                {loggedIn == true ?<Link className="a-header" to="/logout">
                <li onClick={logout}>Logout</li>
                </Link> : ""}
                
            </ul>
            <div className="search">
                <span className="searchBar"><i className="fa fa-search"></i><input type="text"className="input-show"  placeholder="Search"></input> </span>
                <i className="fa fa-shopping-cart"></i>
            </div>
        </nav>
    );
};

export default Header;
