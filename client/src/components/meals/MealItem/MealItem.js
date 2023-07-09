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
    console.log('props: ', props);
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: enteredAmountNumber, //wieso ist die amount überhaupt noch da???
      price: props.price,
      description: null
    })
  };

  return (
    // the meals name, description and add button is being return here
    //depending on the meal. The information is going to differ. 
    //the information here is transferred to availableMeals.js and the map function is used to loop throughn it
    <li style={{ borderBottom: '1px solid gray', paddingBottom: '10px', marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <h3 style={{ color: 'black', fontSize: '1.2rem' }}>{props.name}</h3>
          <div>{props.description}</div>
          <div style={{ marginTop: '8px', color: 'green', fontWeight: 'bold' }}>{price}</div>
        </div>
        <img
          src={props.imagePath}
          alt="Kein Bild vorhanden"
          style={{ maxWidth: '300px', maxHeight: '300px', marginLeft: 'auto' }}
        />
      </div>

      <div>
        <button
          ref={amountInputRef}
          value="1"
          onClick={submitHandler}
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer', 
          }}
        >
          + Add
        </button>
      </div>
    </li>



  );
};

export default MealItem;
