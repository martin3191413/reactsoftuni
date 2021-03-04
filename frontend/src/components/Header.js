import React from 'react';
import Login from '../components/Login';
const Header = () => {

    return (
        <nav>
            <div className="logo">
                <img className="bannerLogo" alt="logo"></img>
            </div>
            <ul>
                <li>Home</li>
                <li>Men</li>
                <li>Women</li>
                <li>About</li>
                <li>Contacts</li>
                <li>Login</li>
            </ul>
            <div className="search">
                <span className="searchBar"><i className="fa fa-search"></i><input type="text"className="input-show"  placeholder="Search"></input> </span>
                <i className="fa fa-shopping-cart"></i>
            </div>
        </nav>
    );
};

export default Header;
