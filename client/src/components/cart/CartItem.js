import CartContext from "../../store/cart-context";
import classes from "./CartItem.module.css";
import {useContext, useId, useState, useRef} from 'react'

const CartItem = (props) => {
  // const [description, setDescription] = useState(props.specificCartItem);
  const [buttonColor, setButtonColor] = useState('inherit');
  const [buttonText, setButtonText] = useState('Add comment');
  const [buttonTextColor, SetButtonTextColor] = useState('');
  
  const[text, setText] = useState("")
  const textareaRef = useRef(null);
  const CartCTX = useContext(CartContext)
  const handleChange = (e) =>{
    setText(e.target.value);
  }

  const handleSubmitClick = () => {
    setButtonColor('green');
    setButtonText('Comment added!');
    SetButtonTextColor('white');

    const textareaValue = textareaRef.current.value;
    console.log(textareaValue);
    props.specificCartItem.description = textareaValue;
    //setting description
  };


  const theId = useId()
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
        <textarea
          name="extra"
          id={theId}
          value={text}
          onChange={handleChange}
          placeholder={props.specificCartItem.type === "drink" ? "Comment" : "Extra topping? Another wish? Write it here!"}
          ref={textareaRef}
          rows={2}
          cols={30}
          maxLength={128}
        >
          </textarea>
        <button
          name="submitComment"
          onClick={handleSubmitClick} 
          style={{
            backgroundColor: buttonColor,
             color: buttonTextColor,
            width: '90px',
            fontSize: '14px'
          }}
            > {buttonText}</button>
      </div>
    </li>
  );
};

export default CartItem;
