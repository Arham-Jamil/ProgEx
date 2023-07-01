import { Fragment,useContext, useEffect, useState } from "react";
import mainheaderImage from "../../assests/main-qimg-981ceae310b1cf68e367f110ae991ff0-lq.jpeg";
import classes from "./Header.module.css";
import CartContext from "../../store/cart-context";
import Cart from "../cart/Cart";
import { createPortal } from "react-dom";
import CartItem from "../cart/CartItem";

//this the top bar of the application.
//It contains the cart button(HeaderCartBtn), app title etc
//fragment allows you to group various elements in a component without having to add them to app.js
const Header = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
 

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  
  //to see the cart
  const [cart, showCart] = useState(false);
  const seeCart = () =>{
    showCart(true)
  }

  /////////////////////////////////////////
  const lastOrders = useContext(CartContext);
  const totalAmount = `: €${lastOrders.totalAmount.toFixed(2)}`;
  const[order, seeOrder] = useState(false);
  const seeOrders = () =>{
    seeOrder(true);
  }
  const orders = (
    <ul className={classes["cart-items"]}>
      {lastOrders.items.map((item) => (
        <CartItem 
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
        />
      ))}
    </ul>
  )

  //for the orders
  return (
    <Fragment>
      <header className={classes.header}>
        
        <h1>Restaurant Order App</h1>
        {/* this ths cart btn       */}
        {/* <HeaderCartButton onClick={props.onShowCart} /> */}
      {<button className={btnClasses} onClick={seeCart}>
      <span className={classes.icon}>
        { <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>}
      </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>}{
      cart && createPortal(
        <Cart onClose={()=>showCart(false)}/>,
        document.body
      )
    }
    <button onClick={seeOrders}>last orders</button>
    {order &&(
      <>
           <>
          {orders}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={()=>seeOrder(false)}>
              Close
            </button>
          </div>
           </>
      </>
    )}
      </header>
      <div className={classes["main-image"]}>
        <img src={mainheaderImage} alt="Frontpage Image" />
      </div>
    </Fragment>
  );
};

export default Header;
