import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // Function to fetch dishes
    const fetchMeals = async () => {
      try {
        const response = await axios.get('/dishes'); // Make the GET request to the API endpoint
        setMeals(response.data); // Set the fetched dishes in the state variable
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeals(); // Call the function to fetch dishes when the component mounts
  }, []);

    const mealsList = meals.map((meal) => (
      // the information her comes from MealItem
      <MealItem
        id={meal.ID}
        key={meal.ID}
        name={meal.Name}
        description={meal.Description}
        price={meal.Price}
      />
    ));

  return (
    <section className={classes.meals}>
      <Card>
        {/* list of meals appear here */}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
