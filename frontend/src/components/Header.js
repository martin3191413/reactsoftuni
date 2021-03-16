import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Header = ({loggedIn, setLoggedIn, setCartItems, cartItems}) => {
    
    const [isActive, setIsActive] = useState('');

    const toggleClass = (e) => {
        setIsActive(prevState => {
                setIsActive(e.target.value);
        });
    };
    const logout = () => {
        localStorage.clear();
        setLoggedIn(false);
        setCartItems([]);
        window.location.href = '/';
    };

    const displayCartItems = (cartItems) => {
        let classes = '';
        if (cartItems.length == 0){
            classes += 'none';
        }
        else{
            classes = 'display';
        }
        return classes;
    };


    return (
        <nav>
            <div className="logo">
                <Link to="/" className="link-logo">mySite</Link>
                <img className="header-logo"></img>
            </div>
            <ul>
                <Link className="a-header" to="/">
                <li onClick={toggleClass} className={isActive == "0 "? 'dot' : ""} value="0">Home</li>
                </Link>
                <Link  className="a-header" to="/men">
                <li onClick={toggleClass} className={isActive == "1" ? 'dot' : ""} value="1">Men</li>
                </Link>
                <Link className="a-header" to="/women">
                <li onClick={toggleClass} className={isActive == "2" ? 'dot' : ""}  value="2">Women</li>
                </Link>
                <Link className="a-header"   to="/about">
                <li  onClick={toggleClass} className={isActive == "3" ? 'dot' : ""} value="3">About</li>
                </Link>
                <Link className="a-header" to="/contacts">
                <li onClick={toggleClass} className={isActive == "4" ? 'dot' : ""}  value="4">Contacts</li>
                </Link>
                {loggedIn == false ?<Link className="a-header" to="/register">
                <li  onClick={toggleClass} className={isActive == "5" ? 'dot' : ""} value="5">Register</li>
                </Link> : ""}
                {loggedIn == false ?<Link className="a-header" to="/login">
                <li onClick={toggleClass} className={isActive == "6" ? 'dot' : ""}  value="6">Login</li>
                </Link> : ""}
                {loggedIn == true ?<Link className="a-header" to="/logout">
                <li onClick={logout}>Logout</li>
                </Link> : ""}
                
            </ul>
            <div className="search">
                <span className="searchBar"><i className="fa fa-search"></i><input type="text"className="input-show"  placeholder="Search"></input> </span>
                <span className="cart-items">
                <Link to="/cart" className="cart-link"><i className="fa fa-shopping-cart"><small className="cart-items-qty">1</small></i></Link>
                </span>
            </div>
            
        </nav>
    );
};

export default Header;
