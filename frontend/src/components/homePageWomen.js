import React from 'react';


const MainContent = ({data}) => {

    const filteredData = data.filter((item) => item.category == 'Women');

    const listItems = filteredData.map((item) =>
    <div className="card" key={item.id}>
        <img className="img" src={item.image} alt="item "></img>
        <h3>{item.product_name}</h3>
        <p className="card-desc">{item.description}</p>
        <span className="price">{item.price}</span>
        <div className="btn">
            <span className="btn btn-text">Add to Cart</span>
        </div>
    </div>
    );

    return (
        <div className="trd"> Woman's Collection Trending Now
        <div className="mainContent">
            {listItems}
        </div>
        </div>
    );
};

export default MainContent;