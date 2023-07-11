import React from 'react';
import { NavLink } from 'react-router-dom';
import './StaffNavHeader.css'; // Import the CSS file

const StaffNavHeader = () => {
  return (
    <header className="nav-header">
      {/* <h2>Navigation</h2> */}
      <ul className="nav-list">
        <li>
          <NavLink to="/" className={({isActive}) => (isActive ? 'active' : null)}>
            Homepage
          </NavLink>
        </li>
        <li>
          <NavLink to="/OrdersPage" className={({isActive}) => (isActive ? 'active' : null)}>
            OrdersPage
          </NavLink>
        </li>
        <li>
          <NavLink to="/ingredientsList" className={({isActive}) => (isActive ? 'active' : null)}>
            Ingredients List
          </NavLink>
        </li>
        <li>
          <NavLink to="/editExtras" className={({isActive}) => (isActive ? 'active' : null)}>
            Edit Extras
          </NavLink>
        </li>
        <li>
          <NavLink to="/editCategoryDish" className={({isActive}) => (isActive ? 'active' : null)}>
            Edit Category Dish
          </NavLink>
        </li>
        <li>
          <NavLink to="/editCategoryDrinks" className={({isActive}) => (isActive ? 'active' : null)}>
            Edit Category Drinks
          </NavLink>
        </li>
        <li>
          <NavLink to="/editDishes" className={({isActive}) => (isActive ? 'active' : null)}>
            Edit Dishes
          </NavLink>
        </li>
        <li>
          <NavLink to="/editDrinks" className={({isActive}) => (isActive ? 'active' : null)}>
            Edit Drinks
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default StaffNavHeader;
