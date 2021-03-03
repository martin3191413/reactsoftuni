import React from 'react';

import product_card from './product_data';

const MainContent = () => {

    const listItems = product_card.map((item) =>
    <div className="card" key={item.id}>
        <img className="img" src={item.thumb} alt="item "></img>
        <h3>{item.product_name}</h3>
        <p>{item.description}</p>
        <span className="price">{item.price}</span>
        <div className="btn">
            <span className="btn btn-text">Add to Cart</span>
        </div>
    </div>
    );

    return (
        <div className="mainContent">
            {listItems}
        </div>
    );
};

export default MainContent;
