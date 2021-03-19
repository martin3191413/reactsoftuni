import React, {useEffect, useState} from 'react';
import {NavLink, Link} from 'react-router-dom';

const Header = ({loggedIn,setLoggedIn, setCartItems, cartItems, setSearchInput, searchInput}) => {

    useEffect(() => {
        setUserEmail(localStorage.getItem('userEmail'));
    }, [loggedIn]);

    const [userEmail,setUserEmail] = useState((localStorage.getItem('userEmail')) || null);

    const logout = () => {
        localStorage.clear();
        setLoggedIn(false);
        setCartItems([]);
        window.location.href = '/';
    };

    const displayCartItems = (cartItems) => {
        let classes = '';
        if (cartItems.length === 0){
            classes += 'none';
        }
        else{
            classes = 'display';
        }
        return classes;
    };

    const successfull = <Link to="/profile" className="user-link"><span className="email">Hi, {userEmail}</span><i className="far fa-user"></i> | <Link className="user-link" onClick={logout}>Logout</Link></Link>;

    const unsuccessfull = <><Link to="/login" className="user-link-login">Login</Link> | <Link to="/register" className="user-link-register">Register</Link></>;

    return (
        <>
        <div className="header-profile">
            {userEmail !== null ? successfull : unsuccessfull }
        </div>
        <nav>
            <div className="logo">
                <Link to="/" className="link-logo">mySite</Link>
            </div>
            <ul>
                <NavLink className="a-header" to="/" activeClassName="active" exact>Home
                </NavLink>
                <NavLink  className="a-header" to="/men" activeClassName="active">Men
                </NavLink>
                <NavLink className="a-header" to="/women"activeClassName="active" >Women
                </NavLink>
                <NavLink className="a-header" to="/contacts" activeClassName="active">Contacts
                </NavLink>
            </ul>
            <div className="search">
                <span className="searchBar"><Link className="sarch-link" to="/search"><i className="fa fa-search"></i></Link><form className="search-form"><input type="text"className="input-show" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}  placeholder="Search"></input></form></span>
                <span className="cart-items">
                <Link to="/profile" className="profile-link"><i className="far fa-heart header"></i></Link>
                <NavLink to="/cart" className="cart-link" activeClassName="active-cart"><i className="fa fa-shopping-cart"><small className={`cart-items-qty ${displayCartItems(cartItems)}`}>{cartItems.length}</small></i></NavLink>
                </span>
            </div>
            
        </nav>
        </>
    );
};

export default Header;
