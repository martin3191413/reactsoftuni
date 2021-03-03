import React from 'react';
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom';
import Login from '../components/Login'

const Header = ({searchInput, setSearchInput}) => {

    const searchIconHandler = () => {
        setSearchInput(!searchInput);
    };

    const toggleInputField = 'input-show';
    const hideInputField = 'input-hide';
 
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
                <input type="text"className={searchInput === true ? toggleInputField : hideInputField }  placeholder="Search.."></input>
                <i className="fa fa-search" onClick={searchIconHandler}></i>
                <i className="fa fa-shopping-cart"></i>
            </div>
        </nav>
    );
};

export default Header;
