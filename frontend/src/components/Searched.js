import React from 'react';
import Header from './Header';
import HomePageListItem from './HomePageListItem';
import Footer from './Footer';

const Searched = ({setSearchInput, loggedIn, setLoggedIn, setCartItems, cartItems, data,searchInput}) => {

    const filteredItemsBySearch = data.filter(item => item.model.toLowerCase().includes(searchInput.toLowerCase()));

    const noItems = <h2 className="no-search-items">We could not find anything for "{searchInput}".</h2>;


    const items = filteredItemsBySearch.map(item => (
        <HomePageListItem item={item} key={item._id} setCartItems={setCartItems} cartItems={cartItems} loggedIn={loggedIn}/>
    ));

    return (
        <>
        <Header setSearchInput={setSearchInput} searchInput={searchInput}  loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems}/>
        <div className="mainContent">
            {items.length !== 0 ? items : noItems}
        </div>
        <Footer />
        </>
    );
};

export default Searched;
