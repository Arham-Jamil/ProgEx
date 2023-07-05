import React, { useState } from 'react';
import OrderList from './OrderList.js';

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('OrderedDishes');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h1>Orders Page</h1>

      <div className="tabs">
        <button
          className={activeTab === 'OrderedDishes' ? 'active' : ''}
          onClick={() => handleTabChange('OrderedDishes')}
        >
          Ordered Dishes
        </button>
        <button
          className={activeTab === 'OrderedDrinks' ? 'active' : ''}
          onClick={() => handleTabChange('OrderedDrinks')}
        >
          Ordered Drinks
        </button>
        <button
          className={activeTab === 'Orders' ? 'active' : ''}
          onClick={() => handleTabChange('Orders')}
        >
          All Orders
        </button>
      </div>

      {activeTab === 'OrderedDishes' && <OrderList type="OrderedDishes" />}
      {activeTab === 'OrderedDrinks' && <OrderList type="OrderedDrinks" />}
      {activeTab === 'Orders' && <OrderList type="Orders" />}
    </div>
  );
};

export default OrdersPage;