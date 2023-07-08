import MealItem from "./MealItem/MealItem";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [categoryDish, setCategoryDish] = useState([]);

  const fetchMeals = async () => {
    try {
      const response = await axios.get('http://localhost:3001/dishesjoin');
      setMeals(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchCategoryDish = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categorydish');
      setCategoryDish(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategoryDish();
    fetchMeals();
  }, []);

  return (
    <section>
      <ul style={{ listStyle: 'none' }}>
        {categoryDish.map((category) => (
          <div key={category.ID} >
            <h2 style={{ backgroundColor: '#f28a8a', color: 'black', padding: '0.5rem' }}>{category.Name}</h2>
            {meals
              .filter((meal) => meal.CategoryName === category.Name)
              .map((meal) => (
                <MealItem
                  id={meal.ID}
                  key={meal.ID}
                  name={meal.Name}
                  description={meal.Description} //bin mir nicht sicher ob das noch benötigt wird hab aber Angst es zu löschen
                  price={meal.Price}
                  imagePath={meal.ImagePath}
                />
              ))}
          </div>
        ))}
      </ul>
    </section>
  );
};

export default AvailableMeals;
