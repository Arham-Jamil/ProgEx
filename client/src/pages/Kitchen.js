import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Kitchen = () =>{
    const [orders, setOrders] = useState([]);
    // const [orderedDishes, setOrderedDishes] = useState([]);
    // const [orderedDrinks, setOrderedDrinks] = useState([]);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/orders'); 
        setOrders(response.data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders(); // Call the function to fetch dishes when the component mounts
  }, []);

  const orderList = orders.map((order) => (

    <div key={order.ID}>
      <p>ID: {order.ID}</p>
      <p>Table Number: {order.TableNumber}</p>
      <p>Paid: {order.Paid}</p>
      <p>Date: {order.Date}</p>
      <hr />
    </div>
  ));
  
    return(
        <div>
        <h1>Admin page</h1>
        <h2>Orders</h2>
        <ul>{orderList}</ul>
        <h2>OrderedDishes</h2>

        <h2>OrderedDrinks</h2>
        <h2>Ingredients</h2>


        </div>
    )
}
export default Kitchen