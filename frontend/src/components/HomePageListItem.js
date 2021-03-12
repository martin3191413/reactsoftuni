import React  from 'react';
import {Link} from 'react-router-dom';

const HomePageListItem = ({item,setCartItems, cartItems}) => {


    const onClickHandler = (item) => {
        setCartItems(oldCartItems => [...oldCartItems,item]);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };


    return (
        <>
        <div className="card" key={item._id} >
      <Link className="a-home" to={`details/${item._id}`}><img className="img" src={item.image} alt="item "></img></Link>
        <h3>{item.product_name}</h3>
        <p className="card-desc">{item.description}</p>
        <span className="price">{item.price}</span>
        <div className="btn">
            <span className="btn btn-text" onClick={() => onClickHandler(item)}>Add to Cart</span>
        </div>
    </div>
        </>
    );
};

export default HomePageListItem;
;