import React, {useContext, useEffect}  from 'react';
import {Link, useHistory} from 'react-router-dom';
import { UserContext } from './UserContext';
import { useAlert } from 'react-alert';

const HomePageListItem = ({item}) => {

    const history = useHistory();
    const alert = useAlert();

    const {loggedIn,cartItems, setCartItems} = useContext(UserContext);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const onClickHandler = (item) => {
        if (!loggedIn){
            history.push('/login');
            return;
        }
        let itemInCart = cartItems.find(x => x._id === item._id);

        alert.show('Item added to Cart!');

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
        <div className="card" key={item._id}>
      <Link className="a-home" to={`details/${item._id}`}><img className="img" src={item.image} alt="item "></img></Link>
        <p className="card-desc">{item.model}</p>
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