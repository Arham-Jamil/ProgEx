import Modal from "react-modal";
import axios from 'axios'
import { useState, useEffect } from "react";

const LastOrderedStuff = ({isOpen, onClose}) =>{
const [LastOrderedDishes, setLastOrderedDishes] = useState([]);
const [LastOrderedDrinks, setLastOrderedDrinks] = useState([]);
const [sumLastOrders, setSumLastOrders] = useState(null);


const urlParams = new URLSearchParams(window.location.search);
const tableNumber = urlParams.get('tableNumber');

useEffect(() => {
    fetchLastOrderedDishes();
    fetchLastOrderedDrinks();
    fetchSumLastOrders();
  }, [isOpen]);

const fetchLastOrderedDishes = async () =>{
  try{
    const responseLastOrderedDishes = await axios.post('http://localhost:3001/LastOrderedDishes', {tableNumber});
    setLastOrderedDishes(responseLastOrderedDishes.data);
  }catch(error){
    console.log(error);
    setLastOrderedDishes([]);
  }
};

const fetchLastOrderedDrinks = async () =>{
  try{
    const responseLastOrderedDrinks = await axios.post('http://localhost:3001/LastOrderedDrinks', {tableNumber});
    setLastOrderedDrinks(responseLastOrderedDrinks.data);
  }catch(error){
    console.log(error);
    setLastOrderedDrinks([]);
  }
};

const fetchSumLastOrders = async () =>{
  try{
    const responseSumDishLastOrders = await axios.post('http://localhost:3001/LastOrdersDishSum', {tableNumber});
    const responseSumDrinkLastOrders = await axios.post('http://localhost:3001/LastOrdersDrinkSum', {tableNumber});
    const TotalDishPrice = responseSumDishLastOrders.data.DishPrice || 0;
    const TotalDrinkPrice = responseSumDrinkLastOrders.data.DrinkPrice || 0;
    const totalprice = TotalDishPrice + TotalDrinkPrice;
    setSumLastOrders(totalprice);
  }catch(error){
    console.log(error);
    setSumLastOrders(null);
  }
};


    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Popup"
             >
        <div>
        <h3>Last Ordered Dishes:</h3>
        <ul>
        {LastOrderedDishes.map((dish) => (
          <li key={dish.ID}>
            <p>Name: {dish.DishName}</p>
            <p>Price: {dish.DishPrice}€</p>
            <p>Description: {dish.OrderedDishDescription}</p>
          </li>
        ))}
      </ul>
      </div>
      <div>
  <h3>Last Ordered Drinks:</h3>
  <ul>
        {LastOrderedDrinks.map((drink) => (
          <li key={drink.ID}>
            <p>Name: {drink.DrinkName}</p>
            <p>Price: {drink.DrinkPrice}€</p>
          </li>
        ))}
      </ul>
</div>
<h3>Total Price: {sumLastOrders}€</h3>
        <button onClick={onClose}>Close</button>
    </Modal>
    );
};

export default LastOrderedStuff;