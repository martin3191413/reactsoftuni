import React from 'react';

import product_card_women from './product_data_women';

const MainContent = () => {

    const listItems = product_card_women.map((item) =>
    <div className="card" key={item.id}>
        <img className="img" src={item.thumb} alt="item "></img>
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