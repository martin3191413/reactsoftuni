import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const UserProfileItem = ({item, cartItems, setCartItems, displayIcons, userFavItems, setUserFavItems}) => {

    const [heartIcon, setHeartIcon] = useState('user-profile fa fa-heart');

    const onClickHandler = (item) => {
        let itemInCart = cartItems.find(x => x._id === item._id);

        if (itemInCart){
            let oldCartItems = [...cartItems];
           oldCartItems = oldCartItems.filter(x => x._id !== item._id);

           setCartItems([...oldCartItems, {...itemInCart, qty: itemInCart.qty + 1}]);
        }
        else{
            const editedItem = {...item, qty: 1};
          setCartItems([...cartItems, editedItem]);
        }
    };

    const toggleHeartIcon = (item) => {
        if (heartIcon === 'user-profile fa fa-heart'){
            let oldFavItems = [...userFavItems];
            oldFavItems = oldFavItems.filter(x => x._id !== item._id);
            const editedItem = {...item, liked:false};
            setUserFavItems([...oldFavItems,editedItem]);
            setHeartIcon('user-profile far fa-heart');

        }
        else{
            let oldFavItems = [...userFavItems];
            oldFavItems = oldFavItems.filter(x => x._id !== item._id);
            const editedItem = {...item, liked:true};
            setUserFavItems([...oldFavItems,editedItem]);
            setHeartIcon('user-profile fa fa-heart');
        }

    };

    return (
        <div className="card-fav">
            <Link className="a-home" to={`details/${item._id}`}><img className="img" src={item.image} alt="item "></img></Link>
            <i style={{display: displayIcons ? 'block' : 'none' }} onClick={() => toggleHeartIcon(item)}   className={heartIcon}></i>
            <span className="profile-item-model">{item.model}</span>
            <span className="profile-item-category">{item.category}</span>
            <span className="profile-item-price">{item.price}</span>
            <button className="profile-item-btn" onClick={() => onClickHandler(item)}>Add to Cart</button>
        </div>
    );
};

export default UserProfileItem;
