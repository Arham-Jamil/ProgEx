import CartContext from "../../store/cart-context";
import classes from "./CartItem.module.css";
import {useContext, useId, useState} from 'react'

const CartItem = (props) => {

  const[text, setText] = useState("")
  const CartCTX = useContext(CartContext)
  const extras = (e) =>{
    setText(CartCTX.addText(e.target.value))
  }
  const theId = useId()
  // must be adjusted with the database
  const price = `€${props.price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          {/* <span className={classes.amount}>x {props.amount}</span> */}
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
        <textarea name="extra" id={theId} value={text} onChange={extras}></textarea>
      </div>
    </li>
  );
};

export default CartItem;
