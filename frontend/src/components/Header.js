import React from 'react';
import {BrowserRouter as Router,Link} from 'react-router-dom';
const Header = () => {
    return (
        <nav>
            <div className="logo">
                mySite
            </div>
            <ul>
                <Link to="/">
                <li>Home</li>
                </Link>
                <Link to="/men">
                <li>Men</li>
                </Link>
                <Link to="/women">
                <li>Women</li>
                </Link>
                <Link to="/about">
                <li>About</li>
                </Link>
                <Link to="/contacts">
                <li>Contacts</li>
                </Link>
                <Link to="/login">
                <li>Login</li>
                </Link>
            </ul>

            <div className="search">
                <span className="searchBar"><i className="fa fa-search"></i><input type="text"className="input-show"  placeholder="Search"></input> </span>
                <i className="fa fa-shopping-cart"></i>
            </div>
        </nav>
    );
};

export default Header;
