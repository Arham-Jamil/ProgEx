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
      amount: enteredAmountNumber, 
      price: props.price,
      description: null,
      type: props.type, //added this to differentiate between dishes and drinks
      ...(props.type === 'drink' ? { volume: props.volume } : {}) //mal gucken ob das geht
    })
  };

  return (
    // the meals name, description and add button is being return here
    //depending on the meal. The information is going to differ. 
    //the information here is transferred to availableMeals.js and the map function is used to loop throughn it
    <li style={{ borderBottom: '1px solid gray', paddingBottom: '10px', marginBottom: '10px' }}>
    <div style={{ display: 'flex', alignItems: 'normal' }}>
      <div>
        <h3 style={{ color: 'black', fontSize: '1.5rem', marginBottom: '8px' }}>{props.name}</h3>
        
        {/* if type=drink display its volume as well */}
        <div style={{ marginBottom: '1rem' }}>
          {props.type === 'drink' && <div>{props.volume}</div>}
        </div>
        
        <div>{props.description}</div>
        <div style={{ marginTop: '1rem', color: 'black', fontWeight: 'bold' }}>{price}</div>
        
        
        <div style={{ marginTop: '1rem'}}>
      <button
        ref={amountInputRef}
        value="1"
        onClick={submitHandler}
        style={{
          // backgroundColor: '#039dfe',
          backgroundColor: '#fe9d36',

          color: 'black',
          fontWeight: '1000',
          border: '#black',
          padding: '0.5rem 1rem',
          borderRadius: '15px',
          cursor: 'pointer',
          marginTop: '8px',
        }}
      >
        + Add
      </button>
    </div>
      
      </div>
      <img
        src={props.imagePath}
        alt="Kein Bild vorhanden"
        style={{ width: '250px', height: '250px', marginLeft: 'auto' ,objectFit: 'cover'}}
      />
    </div>
  


  </li>
  



  );
};

export default MealItem;
