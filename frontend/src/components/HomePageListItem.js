import React, {useEffect}  from 'react';
import {Link} from 'react-router-dom';

const HomePageListItem = ({item,setCartItems, cartItems}) => {


    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

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


    return (
        <>
        <div className="card" key={item._id} >
      <Link className="a-home" to={`details/${item._id}`}><img className="img" src={item.image} alt="item "></img></Link>
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