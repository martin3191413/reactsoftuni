import React, { useState, useEffect, useContext } from 'react';
import Footer from './Footer';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import { UserContext } from './UserContext';
import LoadingBar from './LoadingBar';
import {useAlert} from 'react-alert';

const DetailsPage = ({id}) => {

    const { cartItems, setCartItems, userFavItems, setUserFavItems} = useContext(UserContext);

    const [data,setData] = useState({});
    const [inputValue, setInputValue] = useState(1);
    const [favouriteBtn, setFavouriteBtn] = useState('fa fa-heart');
    const [loading, setLoading] = useState(false);

    const alert = useAlert();

    const fetchData = (e) => {
        setLoading(true);
        axios({
            url: `/api/shoes/${id}`,
            method: "GET"
        })
        .then((response) => {
            setData(response.data);

            const item = userFavItems.find(item => item._id == response.data._id);

            if (item){
                setFavouriteBtn('fa fa-heart');
            }
            else{
                setFavouriteBtn('far fa-heart');
            }

            setLoading(false);
        })
        .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchData();
        localStorage.setItem('userFavItems', JSON.stringify(userFavItems));
    }, []);

    const onChangeInput = (e) => {
        if (e.target.value < 1){
           return;
        }
        setInputValue(e.target.value);
    };


    const onClickHandler = (id) => {
        alert.show('Item added to Cart!');

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

    const toggleClassName = () => {
        if (favouriteBtn === 'far fa-heart'){
            setFavouriteBtn('fa fa-heart');
            setUserFavItems([...userFavItems, {...data, liked: true}]);
            localStorage.setItem('userFavItems', JSON.stringify(userFavItems));
        }
        else{
            setFavouriteBtn('far fa-heart');
            const filteredItems = userFavItems.filter(item => item._id !== data._id);
            setUserFavItems(filteredItems);
            localStorage.setItem('userFavItems', JSON.stringify(userFavItems));
        }
    };

    const row = <div className="row">
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
        <button className="details-btn favourite" onClick={(e) => toggleClassName(e)}>Favourite <i className={favouriteBtn}></i></button>
        </div>
        <h3>Product Details    <i className="fa fa-indent"></i> </h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
         when an unknown printer took 
        a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, b</p>
    </div>
    </div>;


    return (
        <div>
       <Header/>
        {loading === true ? <LoadingBar /> : row}
        <Footer />
        </div>
    );
};

export default DetailsPage;
