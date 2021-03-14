import React, {useState,useEffect} from 'react';
import HomePageListItem from './HomePageListItem';
import Footer from './Footer';
import axios from 'axios';

const MenSection = ({data, cartItems, setCartItems}) => {

    const [sortType,setSortType] = useState('');

    let allMenShoes = data.filter(item => item.category == "Men");

    const [shoesData, setShoesData] = useState([]);
 
    const listItems = allMenShoes.map((item) =>
    <HomePageListItem item={item} setCartItems={setCartItems} cartItems={cartItems}/>
    );

    useEffect(() => {
        const sortArray = type => {
          const types = {
            1: "1",
            2: "2"
          };
          const sortProperty = types[type];
          const sorted = [...allMenShoes].sort((a, b) => b[sortProperty] - a[sortProperty]);
          setShoesData(sorted);
        };
    
        sortArray(sortType);
      }, [sortType]);

    return (
        <>
        <div className="trd">Men's Trainers & Shoes ({allMenShoes.length})
        <form>
        <select className="dropdown" onChange={(e) => setSortType(e.target.value)}>
    <option value="0" defaultValue>Sort By</option>
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

export default MenSection;
