import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = ({ type }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/${type}`);
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    const postOrder = async () => {
      const data = {
        orderId,
        newStatus
      };

      try {
        console.log('accessing db...\n Update Order: ', data);
        const response = await axios.patch(`http://localhost:3001/${type}`, data);
        console.log(response.data.message); // Log the response message
        //Update the Orders if we successfully change the status
        fetchOrders();
        
      } catch (error) {
      console.error(error);
      }
    };
    postOrder();
  };

  const handleStatusChange = (orderId, event, currentStatus) => {

    const newStatus = Number(event.target.value);

    if(newStatus >= 0 && newStatus !== currentStatus)
    {
      handleUpdateStatus(orderId, newStatus);
    }
  };

  const getOrderStatus = (statusNr) => {
    switch(statusNr) {
      case 0:
        return 'Received';
      case 1:
        return 'In Progress';
      case 2:
        return 'Completed';
      case 3:
        return 'Cancled';
      default:
        return 'UnknownStatus';
    }
  };

  const renderOrderInfo = (order) => {
    // Render the order-specific information based on the selected type
    if (type === 'OrderedDishes') {
      return (
        <div>
          <p>Dish ID: {order.Dishes_ID}</p>
          <p>Status: {getOrderStatus(order.Status)}</p>
          <p>Description: {order.Description}</p>
          <p>Additional Charges: {order.AdditionalCharges}</p>
          <p>Refunded: {order.refunded=== 0 ? 'NO' : 'YES'}</p>
          <select onChange={(event) => handleStatusChange(order.ID, event, order.Status)}>
          <option value="-1"></option>
            <option value="0">Received</option>
            <option value="1">In Progress</option>
            <option value="2">Completed</option>
            <option value="3">Canceled</option>
          </select>
        </div>
      );
    } else if (type === 'OrderedDrinks') {
      return (
        <div>
          <p>Drink ID: {order.Drinks_ID}</p>
          <p>Status: {getOrderStatus(order.Status)}</p>
          <p>Description: {order.Description}</p>
          <p>Additional Charges: {order.AdditionalCharges}</p>
          <p>Refunded: {order.Refunded=== 0 ? 'NO' : 'YES'}</p>
          <select onChange={(event) => handleStatusChange(order.ID, event, order.Status)}>
          <option value='-1'></option>
            <option value='0'>Received</option>
            <option value='1'>In Progress</option>
            <option value='2'>Completed</option>
            <option value='3'>Canceled</option>
          </select>
        </div>
      );
    } else {
      // Default to orders
      return (
        <div>
          <p>Table Number: {order.TableNumber}</p>
          <p>Paid: {order.Paid === 0 ? 'NO' : 'YES'}</p>
          <p>Date: {order.Datetime}</p>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>{type === 'all' ? 'All Orders' : ` ${type}`}</h2>

      {orders.map((order) => (
        <div key={order.ID}>
          <p>Order ID: {order.ID}</p>
          {renderOrderInfo(order)}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
