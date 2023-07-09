import React, { useEffect, useState } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import axios from 'axios';

const OrderList = ({ type }) => {
  const [orders, setOrders] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [editingOrder, setEditingOrder] = useState(null);


  useEffect(() => {
    fetchOrders();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const fetchOrders = async () => {
    try {

      let url = `http://localhost:3001/${type}`;
      if(type !== "Orders")
      {
        //we want additional info for the other order types
          url = `http://localhost:3001/${type}join`;
      }

      const response = await axios.get(url);
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prevDirection) =>
        prevDirection === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  let sortedOrders = [...orders];

  if (sortColumn) {
    sortedOrders.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortColumn] > b[sortColumn]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const renderSortIcon = (column) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        return <FaSortUp />;
      } else {
        return <FaSortDown />;
      }
    } else {
      return <FaSort />;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
  
    if (editingOrder) {
        setEditingOrder((prevState) => ({
          ...prevState,
          [name]: inputValue,
        }));
      }
    }

  const handleEditOrder = async (orderData) => {
    const postOrder = async () => {
      const data = {orderData};

      try {
        console.log('accessing db...\n Update Order: ', data);
        const url = `http://localhost:3001/${type}`;
        const response = await axios.patch(url, data);
        console.log(response.data.message); // Log the response message
        //Update the Orders if we successfully change the status
        setEditingOrder(null);
        fetchOrders();
        
      } catch (error) {
      console.error(error);
      }
    };
    postOrder();
  };

  const handleStartEdit = (order) => {
    setEditingOrder(order);    
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
  };

  const renderOrderInfo = () => {
    // Render the order-specific information based on the selected type
    if (type === 'OrderedDishes') {
      return (       
        <div>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('ID')}>
                  ID {renderSortIcon('ID')}
                </th>
                <th>Table Number</th>
                <th>Dish Name</th>
                <th>Description</th>
                <th>Additional Charges</th>
                <th>Refunded</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {sortedOrders.map((order) => (
       <tr key={order.ID}>
       <td>{order.ID}</td>
       <td>{order.TableNumber}</td>
       <td>{order.Name}</td>
       <td>{order.Description}</td>
       <td>
                {editingOrder && editingOrder.ID === order.ID ? (
                  <input
                    type="text"
                    name="AdditionalCharges"
                    value={editingOrder.AdditionalCharges}
                    onChange={(event) => handleInputChange(event)}
                  />
                ) : (
                  order.AdditionalCharges
                )}
          </td>
        <td>
                {editingOrder && editingOrder.ID === order.ID ? (
                  <input
                    type="checkbox"
                    name="Refunded"
                    checked={editingOrder.Refunded}
                    onChange={(event) => handleInputChange(event)}
                  />
                ) : (
                  order.Refunded ? 'Yes' : 'No'
                )}
          </td>
          <td>
                {editingOrder && editingOrder.ID === order.ID ? (
                  <select
                  name="Status"
                  value={editingOrder.Status}
                   onChange={(event) => handleInputChange(event)}>
                   <option value="0">Received</option>
                   <option value="1">In Progress</option>
                   <option value="2">Completed</option>
                   <option value="3">Canceled</option>
                 </select>
                ) : (
                  order.Status
                )}
              </td>
       <td>
                {editingOrder && editingOrder.ID === order.ID ? (
                  <div>
                    <button onClick={() => handleEditOrder(editingOrder)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div style={{ display: 'inline-flex' }}>
                  <button onClick={() => handleStartEdit(order)}>Edit</button>
                  </div>
                
                )}
              </td>
     </tr>
      ))}
              
            </tbody>
          </table>
        </div>
      );
    } else if (type === 'OrderedDrinks') {
      return (
        <div>
          <table>
            <thead>
              <tr>
              <th onClick={() => handleSort('ID')}>
                  ID {renderSortIcon('ID')}
                  </th>
                  <th>Table Number</th>
                <th>Drink Name</th>
                <th>Description</th>
                <th>Additional Charges</th>
                <th>Refunded</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {sortedOrders.map((order) => (
              <tr key={order.ID}>
              <td>{order.ID}</td>
              <td>{order.TableNumber}</td>
              <td>{order.Name}</td>
              <td>{order.Description}</td>
              <td>
                {editingOrder && editingOrder.ID === order.ID ? (
                  <input
                    type="text"
                    name="AdditionalCharges"
                    value={editingOrder.AdditionalCharges}
                    onChange={(event) => handleInputChange(event)}
                  />
                ) : (
                  order.AdditionalCharges
                )}
          </td>
        <td>
                {editingOrder && editingOrder.ID === order.ID ? (
                  <input
                    type="checkbox"
                    name="Refunded"
                    checked={editingOrder.Refunded}
                    onChange={(event) => handleInputChange(event)}
                  />
                ) : (
                  order.Refunded ? 'Yes' : 'No'
                )}
          </td>
          <td>
                { editingOrder && editingOrder.ID === order.ID ? (
                  <select
                  name="Status"
                  value={editingOrder.Status}
                   onChange={(event) => handleInputChange(event)}>
                   <option value="0">Received</option>
                   <option value="1">In Progress</option>
                   <option value="2">Completed</option>
                   <option value="3">Canceled</option>
                 </select>
                ) : (
                  order.Status
                )}
              </td>
       <td>
                { editingOrder && editingOrder.ID === order.ID ? (
                  <div>
                    <button onClick={() => handleEditOrder(editingOrder)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div style={{ display: 'inline-flex' }}>
                  <button onClick={() => handleStartEdit(order)}>Edit</button>
                  </div>
                
                )}
              </td>
            </tr>
            ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      // Default to orders
      return (
        <div>
          <table>
            <thead>
              <tr>
              <th onClick={() => handleSort('ID')}>
                  ID {renderSortIcon('ID')}
                  </th>
                <th>Table Number</th>
                <th>Paid</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
              <tr key={order.ID}>
              <td>{order.ID}</td>
              <td>{order.TableNumber}</td>
              <td>
                {editingOrder && editingOrder.ID === order.ID ? (
                  <input
                    type="checkbox"
                    name="Paid"
                    checked={editingOrder.Paid}
                    onChange={(event) => handleInputChange(event)}
                  />
                ) : (
                  order.Paid ? 'Yes' : 'No'
                )}
          </td>
              <td>{order.Datetime}</td>
              <td>
                {editingOrder && editingOrder.ID === order.ID ? (
                  <div>
                    <button onClick={() => handleEditOrder(editingOrder)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div style={{ display: 'inline-flex' }}>
                  <button onClick={() => handleStartEdit(order)}>Edit</button>
                  </div>
                
                )}
              </td>
            </tr>
            ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>{type === 'all' ? 'All Orders' : ` ${type}`}</h2>
      {renderOrderInfo()}
    </div>
  );
};

export default OrderList;
