import CartContext from "../../store/cart-context";
import classes from "./CartItem.module.css";
import {useContext, useId, useState} from 'react'

const CartItem = (props) => {


  // const [description, setDescription] = useState(props.specificCartItem);


  const[text, setText] = useState("")
  const CartCTX = useContext(CartContext)
  const extras = (e) =>{
    // setText(CartCTX.addText(e.target.value))
    setText(e.target.value);
    // props.specificCartItem = e.target.value;
    props.specificCartItem.description = e.target.value;
    console.log('props.specificCartItem', props.specificCartItem.description);

    // CartCTX.text = e.target.value; //warum lieber gott gibt es eine addText() function die aber nicht den Text hinzufügt
    // console.log('CartCTX.addText(e.target.value): ',e.target.value);
   // props.dishDescription = e.target.value; // TET TTE TETEST TE ET
    //hier mit der ID das richtige Dish finden????

    
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
        {/* <button>submit</button> */}
      </div>
    </li>
  );
};

export default CartItem;
