import  "./MealItemForm.module.css";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    // enteredAmount is the base amount and has a value of one
    // enteredAmount is just a way of saying +1 
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

      // must be connected to the database to be able to influence the amount of
      // food or drinks that can be ordered
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 10
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
    amountInputRef.current.value = "1";
  };

  return (
    // the base value of the button is 1. Clicking on the add button adds +1 to the value
      <button ref={amountInputRef} value="1" onClick={submitHandler}>+ Add</button>
  );
};

export default MealItemForm;
