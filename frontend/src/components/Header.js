import React from 'react';
import {Link} from 'react-router-dom';

const Header = ({loggedIn, setLoggedIn, setCartItems, cartItems}) => {

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
                <Link to="/cart" className="cart-link"><i className="fa fa-shopping-cart"><small className="cart-items-number" className={displayCartItems(cartItems)}>{cartItems.length}</small></i></Link>
            </div>
            
        </nav>
    );
};

export default Header;
