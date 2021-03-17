import jwt from 'jsonwebtoken';
import {NavLink, Link} from 'react-router-dom';

const Header = ({loggedIn, setLoggedIn, setCartItems, cartItems}) => {

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

    const successfull = <><span className="email">Hi, {localStorage.getItem('userEmail')}</span><i className="far fa-user"></i></>;

    const unsuccessfull = <>Login | Register</>;


    return (
        <>
        <div className="header-profile">
            {localStorage.getItem('userEmail')!== null ? successfull : unsuccessfull }
        </div>
        <nav>
            <div className="logo">
                <Link to="/" className="link-logo">mySite</Link>
                <img className="header-logo"></img>
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
                {loggedIn === false ?<NavLink className="a-header" to="/register" activeClassName="active">Register
                </NavLink> : ""}
                {loggedIn === false ?<NavLink className="a-header" to="/login" activeClassName="active">Login
                </NavLink> : ""}
                {loggedIn === true ?<NavLink className="a-header" to="/logout" >
                <li onClick={logout}>Logout</li>
                </NavLink> : ""}
                
            </ul>
            <div className="search">
                <span className="searchBar"><i className="fa fa-search"></i><input type="text"className="input-show"  placeholder="Search"></input> </span>
                <span className="cart-items">
                <NavLink to="/cart" className="cart-link" activeClassName="active-cart"><i className="fa fa-shopping-cart"><small className={`cart-items-qty ${displayCartItems(cartItems)}`}>{cartItems.length}</small></i></NavLink>
                </span>
            </div>
            
        </nav>
        </>
    );
};

export default Header;
