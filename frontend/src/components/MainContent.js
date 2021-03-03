import React from 'react';

import product_card from './product_data';

const MainContent = () => {
    const listItems = product_card.map((item) =>
    <div className="card" key={item.id}>
        <h3>{item.name}</h3>
        <img className="img" src={item.thumb} alt="item "></img>
        <p>{item.description}</p>
        <span className="price">{item.price}</span>
        <div className="btn">Add to Cart</div>
    </div>
    );

    return (
        <div className="mainContent">
            {listItems}
        </div>
    );
};

export default MainContent;
