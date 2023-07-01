import classes from "./RestaurantDescription.module.css";

// the big banner at the beginning
const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Welcome to our restaurant!</h2>
      <p>
        Choose from our international menu
      </p>
      <p>
        All our meals are cooked with love and high-quality ingredients by experienced chefs!
      </p>
    </section>
  );
};

export default MealsSummary;
