import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Footer from './Footer';

const MainContent = () => {

    const [data,setData] = useState([]);


    const fetchData = (e) => {

        axios({
            url: '/api/men',
            method: 'GET'
        })
        .then((response) => {
            setData(response);
        });
    };

    const myHeader = <h1>Loading...</h1>;

    
    const listItems = data.map((item) =>
    <div className="card" key={item._id}>
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
        <div className="trd"> Men's Collection Trending Now
        <div className="mainContent">
            {isLoading == true ? myHeader : listItems}
        </div>

        <Footer />
        </div>

    );

};

export default MainContent;