import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from './UserContext';
import Header from './Header';
import HomePageListItem from './HomePageListItem';
import Footer from './Footer';

const Searched = ({data}) => {

  const {loggedIn, setLoggedIn, cartItems, setCartItems, userFavItems, setUserFavItems, searchInput,setSearchInput} = useContext(UserContext);

    const [sortType, setSortType] = useState('0');

    const filteredItemsBySearch = data.filter(item => item.model.toLowerCase().includes(searchInput.toLowerCase()));

    const [searchedItems, setSearchedItems] = useState(filteredItemsBySearch);

    useEffect(() => {
        setSearchedItems(filteredItemsBySearch);
        sortShoes();
    }, [data,sortType]);

    const sortShoes = () => {
        if (sortType === "1"){
          const sortedShoes = [...filteredItemsBySearch].sort(function(a,b){
            return a.price - b.price;
          });
           setSearchedItems(sortedShoes);
        }
        if (sortType === "2"){
          const sortedShoes = [...filteredItemsBySearch].sort(function(a,b){
            return b.price - a.price;
          });
          setSearchedItems(sortedShoes);
        }
        if (sortType === "3"){
            const filteredShoes = [...filteredItemsBySearch].filter(item => item.category === 'Men');
            setSearchedItems(filteredShoes);
          }
          if (sortType === "4"){
            const filteredShoes = [...filteredItemsBySearch].filter(item => item.category === 'Women');
            setSearchedItems(filteredShoes);
          }
        
      };
  

    const noItems = <h2 className="no-search-items">We could not find anything for "{searchInput}".</h2>;


    const items = searchedItems.map(item => (
        <HomePageListItem item={item} key={item._id} setCartItems={setCartItems} cartItems={cartItems} loggedIn={loggedIn}/>
    ));

    return (
        <>
        <Header setSearchInput={setSearchInput} searchInput={searchInput}  loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems}/>
        <select className="dropdown"style={{display: items.length == 0 ? 'none' : 'display'}}  onChange={(e) => setSortType(e.target.value)} >
       <option value="0">Sort By</option>
       <option value="1" >Price: Low-High</option>
        <option value="2">Price: High-Low</option>
        <option value="3">Category: Men</option>
        <option value="4">Category: Women</option>
        </select>
        <div className="mainContent">
            {items.length !== 0 ? items : noItems}
        </div>
        <Footer />
        </>
    );
};

export default Searched;
