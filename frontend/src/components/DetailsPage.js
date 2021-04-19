import React, { useState, useEffect, useContext } from 'react';
import Footer from './Footer';
import {Link} from 'react-router-dom';
import Header from './Header';
import { UserContext } from './UserContext';
import LoadingBar from './LoadingBar';
import {useAlert} from 'react-alert';
import * as fetchDataServices from './services/fetchDataServices';

const DetailsPage = ({id}) => {

    const { cartItems, setCartItems, userFavItems, setUserFavItems} = useContext(UserContext);

    const [data,setData] = useState({});
    const [qtyItem, setQtyItem] = useState('1');
    const [favouriteBtnClassName, setFavouriteBtnClassName] = useState('');
    const [loading, setLoading] = useState(false);
    const alert = useAlert();

    useEffect(() => {
        setLoading(true);
        fetchDataServices.FetchDataOneItem(id)
        .then(response => {
            setData(response.data);
            userFavItems.find(item => item._id === response.data._id) ? setFavouriteBtnClassName('fa fa-heart') : setFavouriteBtnClassName('far fa-heart');
            setLoading(false);
        })
        .catch(err => console.log(err));

        localStorage.setItem('userFavItems', JSON.stringify(userFavItems));
    }, [userFavItems]);

    const onChangeInput = (e) => {
        e.target.value > 0 ? setQtyItem(e.target.value) : setQtyItem('1');
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
           const newItem = {...data, qty: qtyItem};
          setCartItems([...cartItems, newItem]);
        }
    };

    const toggleClassName = () => {
        if (favouriteBtnClassName === 'far fa-heart'){
            setFavouriteBtnClassName('fa fa-heart');
            setUserFavItems([...userFavItems, {...data, liked: true}]);
            const updatedFavItems = [...userFavItems, {...data, liked: true}];
            localStorage.setItem('userFavItems', JSON.stringify(updatedFavItems));
        }
        else{
            setFavouriteBtnClassName('far fa-heart');
            const filteredItems = userFavItems.filter(item => item._id !== data._id);
            setUserFavItems(filteredItems);
            localStorage.setItem('userFavItems', JSON.stringify(filteredItems));
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
        <span className="price">{data.price}$</span>
        <select className="details-select">
            <option>Select Size</option>
            <option>41</option>
            <option>42</option>
            <option>43</option>
        </select>
        <input type="number" value={qtyItem} className="details-input" onChange={onChangeInput}></input> 
        <button className="details-btn" onClick={() => onClickHandler(id)}>Add to Cart</button>
        <button className="details-btn favourite" onClick={(e) => toggleClassName(e)}>Favourite <i className={favouriteBtnClassName}></i></button>
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
