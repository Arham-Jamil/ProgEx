import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";



//databas connection should be made here
const DUMMY_MEALS = [
  {
    id: "1",
    name: "Hamburger",
    description: "The Classic Burger",
    price: 22.99,
  },
  {
    id: "2",
    name: "Fried chicken",
    description: "Special crispy chicken.",
    price: 16.5,
  },
  {
    id: "3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  //the method map is used to go through the meals picking each aspect as seen in <MealItem .. 
  const mealsList = DUMMY_MEALS.map((meal) => (
    // the information her comes from MealItem
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
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
