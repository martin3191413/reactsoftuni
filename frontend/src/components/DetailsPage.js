import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

const DetailsPage = ({loggedIn, setLoggedIn,id, cartItems, setCartItems}) => {
    const [data,setData] = useState({});
    const [inputValue, setInputValue] = useState(1);

    const fetchData = (e) => {
        axios({
            url: `/api/shoes/${id}`,
            method: "GET"
        })
        .then((response) => {
            setData(response.data);
        })
        .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onChangeInput = (e) => {
        if (e.target.value < 1){
           return;
        }
        setInputValue(e.target.value);
    };

    const onClickHandler = (id) => {
        let itemInCart = cartItems.find(x => x._id === id);


        if (itemInCart){
            let oldCartItems = [...cartItems];
           oldCartItems = oldCartItems.filter(x => x._id !== id);

           setCartItems([...oldCartItems, {...itemInCart, qty: itemInCart.qty + 1}]);
        }
          else{
           const item = {...data, qty: inputValue};
          setCartItems([...cartItems, item]);
        }
    };




    return (
        <div>
<Header  loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems}/>
        <div className="row">
            <div className="column">
                <img src={data.image}></img>
            </div>
            <div className="column">
                <p className="product-home"><Link className="to-home" to="/">Home </Link>/ {data.model}</p>
                <h1 >{data.model}</h1>
                <div className="details-info">
                <span className="price">{data.price}</span>
                <select className="details-select">
                    <option>Select Size</option>
                    <option>41</option>
                    <option>42</option>
                    <option>43</option>
                </select>
                <input type="number" value={inputValue} className="details-input" onChange={onChangeInput}></input> 
                <button className="details-btn" onClick={() => onClickHandler(id)}>Add to Cart</button>
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
