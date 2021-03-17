import React from 'react';
import ImageBanner from './imageBanner';
import WomenImageBanner from './womenImageBanner';
import Footer from './Footer';
import HomePageListItem from './HomePageListItem';

const MainContent = ({data,setCartItems, cartItems}) => {

    let filteredData = data.filter((item) =>  item.category === "Men").slice(0,3);

    
    const listItems = filteredData.map((item) =>
    <HomePageListItem item={item} key={item._id} setCartItems={setCartItems} cartItems={cartItems}/>
    );

    const filteredWomenData = data.filter((item) => item.category === "Women").slice(0,3);

    const womenItems = filteredWomenData.map((item) => 
    <HomePageListItem item={item} key={item._id} setCartItems={setCartItems} cartItems={cartItems} />
    );

    return (
        <div className="trd"> Men's Collection Trending Now
        <div className="mainContent">
            {listItems}
        </div>
        <ImageBanner />
        <div className="trd"> Women's Collection Trending Now
        <div className="mainContent">
            {womenItems}
        </div>
        </div>
        <WomenImageBanner />
        <Footer />
        </div>

    );

};

export default MainContent;
