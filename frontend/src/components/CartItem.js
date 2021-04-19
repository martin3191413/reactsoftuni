import {useContext} from 'react';
import {UserContext} from './UserContext';
import {useAlert} from 'react-alert';

const CartItem = ({item}) => {

    const {cartItems, setCartItems} = useContext(UserContext);

    const alert = useAlert();

    const removeClickHandler = (id) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        const filteredCartItems = cartItems.filter(item => item._id !== id);
        setCartItems(filteredCartItems);
        localStorage.setItem('cartItems', JSON.stringify(filteredCartItems));
    };

    const onChangeHandler = (e, item) => {
        if (e.target.value > item.qty){
            let oldCartItems = [...cartItems];
            oldCartItems = oldCartItems.filter((x) => x._id !== item._id);
            const editedItem = {...item, qty: item.qty + 1};
            setCartItems([...oldCartItems, editedItem]);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
        else{
            if (item.qty === 1){
                alert.show('Invalid item quantity!', {
                    type: 'error',
                    timeout: 2000
                });
                return;
            }
            let oldCartItems = [...cartItems];
            oldCartItems = oldCartItems.filter((x) => x._id !== item._id);
            const editedItem = {...item, qty: item.qty - 1};
            setCartItems([...oldCartItems, editedItem]);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

    };

    return (
        <tr className="item-row" key={item._id}>
                <td>
                    <div className="item-info">
                        <img src={item.image} alt="tshirt" className="item-img"></img>
                        <div className="item-details">
                            <p>{item.model}</p>
                            <span>Price:  {item.price.toFixed(2)}$</span>
                            <br></br>
                            <button className="cart-btn" onClick={ () => removeClickHandler(item._id)}>Remove</button>
                        </div>
                    </div>
                </td>
                <td><input type="number" className="cart-quantity-item" onChange={(e) => onChangeHandler(e, item)}  value={item.qty}></input></td>
                <td><span className="price-cart">{item.price.toFixed(2)}$</span></td>
            </tr>
    );
};

export default CartItem;
