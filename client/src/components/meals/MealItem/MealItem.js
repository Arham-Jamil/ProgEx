import { useContext, useRef } from "react";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  // the price should also be adjusted according to the databse
  const price = `€${props.price.toFixed(2)}`;

  ////////////////////////////
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    // enteredAmount is the base amount and has a value of one
    // enteredAmount is just a way of saying +1 
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    amountInputRef.current.value = "1";
      // must be connected to the database to be able to influence the amount of
      // food or drinks that can be ordered
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: enteredAmountNumber,
      price: props.price,
    })
  };

  return (
    // the meals name, description and add button is being return here
    //depending on the meal. The information is going to differ. 
    //the information here is transferred to availableMeals.js and the map function is used to loop throughn it
    <li>
      <div>
        <h3>{props.name}</h3>
        <div>{props.description}</div>
        <div>{price}</div>
      </div>

      <div>
        {/* <MealItemForm id={props.id} onAddToCart={addToCartHandler} /> */}
        <button ref={amountInputRef} value="1" onClick={submitHandler}>+ Add</button>
      </div>
    </li>
  );
};

export default MealItem;
