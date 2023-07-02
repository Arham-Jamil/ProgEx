import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import OrderDelivered from "./OrderDelivered";
import axios from 'axios';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  

  const [showOrder, setShowOrder] = useState(false);

  // total amount must be adjusted usingn the database
  const totalAmount = `€${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  // removes item from the cart
  // must be able to communicate with the databse
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // adds item to then cart
  // must be able to comunicate with the database
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  // logic here must communicate with the dashboard and the database
  const orderHandler = () => {

    const postOrder = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const tableNumber = queryParams.get('tableNumber');
      const orderItems = cartCtx.items;
      const data = {
        orderItems,
        tableNumber,
      };

    try {
      console.log('accessing db...\n new Order: ', data);
      const response = await axios.post('http://localhost:3001/order', data);
      console.log(response.data.message); // Log the response message
  } catch (error) {
    console.error(error);
  }
};

  postOrder(); // Call the function to post order

    // cartCtx.clearall();
    setShowOrder(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {/* loops through contennts of the cart */}
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );



  return (
    <Modal onClose={props.onClose}>
      {/* shows the contents of the cart. If the order button is clicked, the card closes and a connfirmation appears on the screen */}
      {!showOrder ? (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
              Close
            </button>
            {hasItems && (
              <button className={classes.button} onClick={orderHandler}>
                Order
              </button>
            )}
          </div>
        </>
      ) : (
        <OrderDelivered onClose={props.onClose} />
      )}
    </Modal>
  );
};

export default Cart;
