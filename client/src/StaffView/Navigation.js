import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <h2>Navigation</h2>
      <ul>
        <h3>Client Sites</h3>
        <li>
          <Link to="/?tableNumber=696969">Homepage /?tableNumber=696969</Link>
        </li>
        <h3>KitchenView Sites</h3>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/OrdersPage">OrdersPage</Link>
        </li>
        <li>
          <Link to="/ingredientsList">Ingredients List</Link>
        </li>
        <li>
          <Link to="/editExtras">Edit Extras</Link>
        </li>
        <li>
          <Link to="/editCategoryDish">Edit Category Dish</Link>
        </li>
        <li>
          <Link to="/editCategoryDrinks">Edit Category Drinks</Link>
        </li>
        <li>
          <Link to="/editDishes">Edit Dishes</Link>
        </li>
        <h3>Server</h3>
       
        <li>
          <Link to="http://localhost:3001/orders">Orders</Link>
        </li>
        
        <li>
          <Link to="http://localhost:3001/ordereddishes">OrderedDishes</Link>
        </li>
        <li>
          <Link to="http://localhost:3001/ordereddrinks">OrderedDrinks</Link>
        </li>
        <li>
          <Link to="http://localhost:3001/CategoryDish">CategoryDish</Link>
        </li>
        <li>
          <Link to="http://localhost:3001/CategoryDrinks">CategoryDrinks</Link>
        </li>
        <li>
          <Link to="http://localhost:3001/Extras">Extras</Link>
        </li>
        <li>
          <Link to="http://localhost:3001/Ingredients">Ingredients</Link>
        </li>
        <li>
          <Link to="http://localhost:3001/Drinks">Drinks</Link>
        </li>
        <li>
          <Link to="http://localhost:3001/Dishes">Dishes</Link>
        </li>
        <li>
          <Link to="http://localhost:3001/drinksjoin">drinksjoin</Link>
        </li>
        <li>
          <Link to="http://localhost:3001/dishesjoin">dishesjoin</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
