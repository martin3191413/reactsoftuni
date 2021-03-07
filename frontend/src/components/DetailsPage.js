import React from 'react';
import Footer from './Footer';
import {Link} from 'react-router-dom';

const DetailsPage = () => {
    return (
        <div>
        <div className="row">
            <div className="column">
                <img src="https://github.com/prabinmagar/product-page-grid/blob/master/images/shoe-3.png?raw=true"></img>
            </div>
            <div className="column">
                <p className="product-home"><Link to="/">Home</Link>/ T-Shirt</p>
                <h1 >Great Britain Shoes</h1>
                <div className="details-info">
                <span className="price">50.00$</span>
                <select className="details-select">
                    <option>Select Size</option>
                    <option>41</option>
                    <option>42</option>
                    <option>43</option>
                </select>
                <input type="number" value="1" className="details-input"></input> 
                <button className="details-btn">Add to Cart</button>
                </div>
                <h3>Product Details    <i className="fa fa-indent"></i> </h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                 when an unknown printer took 
                a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, b</p>
            </div>

        </div>
        <Footer />
        </div>
    );
};

export default DetailsPage;
