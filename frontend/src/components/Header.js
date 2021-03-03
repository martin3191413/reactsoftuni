import React from 'react';

const Header = () => {
    return (
        <nav>
            <div className="logo">
                mySite
            </div>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contacts</li>
                <li>Login</li>
            </ul>
            <div className="search">
                <i className="fa fa-search"></i>
                <i className="fa fa-shopping-cart"></i>
            </div>
        </nav>
    );
};

export default Header;
