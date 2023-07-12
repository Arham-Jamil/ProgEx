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
            <h2 style={{ backgroundColor: '#febb73', color: 'black', padding: '0.5rem' , fontSize: 30}}>{category.Name}</h2>
            {/* only maps the meals (dishes) which correspond to the category and are available!! */}
            {meals.filter((meal) => (meal.CategoryName === category.Name) && (meal.Available === 1)) 
              .map((meal) => (
                <MealItem
                  id={meal.ID}
                  key={meal.ID}
                  name={meal.Name}
                  description={meal.Description} //Dish Description
                  price={meal.Price}
                  imagePath={meal.ImagePath}
                  type = "dish" //added this to differentiate between dishes and drinks
                />
              ))}
          </div>
        ))}
      </ul>
    </section>
  );
};

export default AvailableMeals;
