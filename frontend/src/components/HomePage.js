import React from 'react';
import {Link} from "react-router-dom";
import ImageBanner from './imageBanner';
import HomePageWomen from './homePageWomen';
import WomenImageBanner from './womenImageBanner';
import Footer from './Footer';

const MainContent = ({data, isLoading}) => {

    const myHeader = <h1>Loading...</h1>;

    const filteredData = data.filter((item) =>  item.category == "Men");
    
    const listItems = filteredData.map((item) =>
    <Link to={`details/${item._id}`}>
    <div className="card" key={item._id} >
        <img className="img" src={item.image} alt="item "></img>
        <h3>{item.product_name}</h3>
        <p className="card-desc">{item.description}</p>
        <span className="price">{item.price}</span>
        <div className="btn">
            <span className="btn btn-text">Add to Cart</span>
        </div>
    </div>
    </Link>
    );

    return (
        <div className="trd"> Men's Collection Trending Now
        <div className="mainContent">
            {isLoading == true ? myHeader : listItems}
        </div>

        <ImageBanner />
        <HomePageWomen data={data} />
        <WomenImageBanner />
        <Footer />
        </div>

    );

};

export default MainContent;
