import React from 'react';
import {Link} from "react-router-dom";
import ImageBanner from './imageBanner';
import HomePageWomen from './homePageWomen';
import WomenImageBanner from './womenImageBanner';
import Footer from './Footer';
import HomePageListItem from './HomePageListItem';

const MainContent = ({data,setCartItems, cartItems}) => {

    const filteredData = data.filter((item) =>  item.category == "Men");
    
    const listItems = filteredData.map((item) =>
    <HomePageListItem item={item} setCartItems={setCartItems} cartItems={cartItems}/>
    );

    return (
        <div className="trd"> Men's Collection Trending Now
        <div className="mainContent">
            {listItems}
        </div>

        <ImageBanner />
        <HomePageWomen data={data} />
        <WomenImageBanner />
        <Footer />
        </div>

    );

};

export default MainContent;
