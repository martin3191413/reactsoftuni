import React from 'react';
import {Link} from 'react-router-dom';


const MainContent = ({data}) => {

    const filteredData = data.filter((item) => item.category == 'Women').slice(0,3);

    const listItems = filteredData.map((item) =>
    <div className="card" key={item.id}>
        <Link className="a-home" to={`details/${item._id}`}><img className="img" src={item.image} alt="item "></img></Link>
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