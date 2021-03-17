import React, {useState,useEffect} from 'react';
import HomePageListItem from './HomePageListItem';
import Footer from './Footer';
import Header from './Header';

const WomenSection = ({loggedIn, setLoggedIn,data,cartItems, setCartItems}) => {


  const [sortType, setSortType] = useState('0');
  const [womenShoes, setWomenShoes] = useState([data]);

  useEffect(() => {
    setWomenShoes(data);
    sortWomenShoes(data);
  }, [data,sortType]);


    const sortWomenShoes = (data) => {
      if (sortType === "0"){
        setWomenShoes(data);
      }
      if (sortType === "1"){
        const sortedShoes = [...womenShoes].sort(function(a,b){
          return a.price - b.price;
        });
         setWomenShoes(sortedShoes);
      }
      if (sortType === "2"){
        const sortedShoes = [...womenShoes].sort(function(a,b){
          return b.price - a.price;
        });
        setWomenShoes(sortedShoes);
      }
    };

  
    const listItems = womenShoes.map((item) =>
    <HomePageListItem item={item} key={item._id} setCartItems={setCartItems} cartItems={cartItems}/>
    );

    return (
        <>
        <Header  loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems}/>
        <div className="trd">Women's Trainers & Shoes ({data.length})
        <form>
        <select className="dropdown" onChange={(e) => setSortType(e.target.value)}>
       <option value="0">Sort By</option>
       <option value="1" >Price: Low-High</option>
        <option value="2">Price: High-Low</option>
        </select>
        </form>
        <div className="mainContent">
            {listItems}
        </div>
        </div>
        <Footer />
        </>
    );
};

export default WomenSection;