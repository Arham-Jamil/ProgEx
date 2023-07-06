import classes from "./CartItem.module.css";
import {useId, useState} from 'react'

const CartItem = (props) => {

  const[text, setText] = useState("")
  const extras = (e) =>{
    setText(e.target.value);
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
          <span className={classes.amount}>x {props.amount}</span>
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
