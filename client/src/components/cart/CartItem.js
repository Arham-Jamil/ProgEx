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
    // setText(CartCTX.addText(e.target.value))
    setText(e.target.value);
    // props.specificCartItem = e.target.value;
    // props.specificCartItem.description = e.target.value;
    // console.log('props.specificCartItem', props.specificCartItem.description);
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
        <textarea
          name="extra"
          id={theId}
          value={text}
          onChange={handleChange}
          placeholder="Your comment here"
          ref={textareaRef}
          rows={2}
          cols={30}
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
        {/* <button>submit</button> */}
      </div>
    </li>
  );
};

export default CartItem;
