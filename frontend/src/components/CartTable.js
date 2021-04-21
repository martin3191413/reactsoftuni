import CartItem from './CartItem';

const CartTable = ({items}) => {

    return (
        <table className="cart-table">
    <tr className="table-header">
    <th>Product</th>
    <th>Quantity</th>
    <th>Subtotal</th>
    </tr>
    {items.map(item => (
        <CartItem item={item} key={item._id} />
    ))}
        </table>
    );
};

export default CartTable;
