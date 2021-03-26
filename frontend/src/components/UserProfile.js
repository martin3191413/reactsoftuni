import React, {useState, useContext} from 'react';
import {UserContext} from './UserContext';
import Header from './Header';
import UserProfileItem from './UserProfileItem';
import Footer from './Footer';

const UserProfile = () => {

    const {loggedIn, setLoggedIn, cartItems, setCartItems, userFavItems, setUserFavItems, searchInput,setSearchInput} = useContext(UserContext);

    const [displayIcons, setDisplayIcons] = useState(false);

    const favItems = userFavItems.map(item => (
        <UserProfileItem item={item} key={item._id} cartItems={cartItems} setCartItems={setCartItems} loggedIn={loggedIn} displayIcons={displayIcons} userFavItems={userFavItems} setUserFavItems={setUserFavItems}/>
    ));

    const noneItems = <h2 className="no-fav-items">Items added to your Favourites will be saved here.</h2>;

    const displayEditOption = (e) => {
        if (e.target.textContent === 'Edit'){
            setDisplayIcons(true);
            e.target.textContent = 'Done';
        }
        else{
            setDisplayIcons(false);
            const updatedFavItems = [...userFavItems].filter(item => item.liked !== false);
            e.target.textContent = 'Edit';
            setUserFavItems(updatedFavItems);
            localStorage.setItem('userFavItems', JSON.stringify(updatedFavItems));
        }
    };

    return (
        <>
        <Header setSearchInput={setSearchInput}  loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems}/>
        <h3 className="favourites-h3">Favourites</h3>
        <button className="edit-fav" style={{display: favItems.length == 0 ? 'none' : 'display'}} onClick={(e) => displayEditOption(e) }>Edit</button>
        <div className="mainContent">
            {favItems.length !== 0 ? favItems : noneItems}
        </div>
        <Footer />
        </>
    );
};

export default UserProfile;
