import MealItem from "./MealItem/MealItem";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableDrinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [categoryDrinks, setcategoryDrinks] = useState([]);

  const fetchDrinks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/drinksjoin');
      setDrinks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchcategoryDrinks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categoryDrinks');
      setcategoryDrinks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchcategoryDrinks();
    fetchDrinks();
  }, []);

  return (
    <section>
      <ul style={{ listStyle: 'none' }}>
        {categoryDrinks.map((category) => (
          <div key={category.ID} >
            <h2 style={{ backgroundColor: '#f28a8a', color: 'black', padding: '0.3rem' }}>{category.Name}</h2>
            {/* only maps the drinks (dishes) which correspond to the category and are available!! */}
            {drinks.filter((drink) => (drink.CategoryName === category.Name) && (drink.Available === 1)) //wird schon in db gemacht aber egal
              .map((drink) => (
                <MealItem
                  id={drink.ID}
                  key={drink.ID}
                  name={drink.Name}
                  description={drink.Description} //Dish Description
                  price={drink.Price}
                  imagePath={drink.ImagePath}
                  volume={drink.Volume + "ml"}
                  type = "drink" //added this to differentiate between dishes and drinks
                />
              ))}
          </div>
        ))}
      </ul>
    </section>
  );
};

export default AvailableDrinks;
