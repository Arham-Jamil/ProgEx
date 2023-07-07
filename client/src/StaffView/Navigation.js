import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <h2>Navigation</h2>
      <ul>
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
          <Link to="/editCategoryDrink">Edit Category Drink</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
