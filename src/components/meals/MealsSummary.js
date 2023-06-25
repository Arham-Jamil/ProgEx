import classes from "./MealsSummary.module.css";

// the big banner at the beginning
const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Welcome to our restaurant</h2>
      <p>
        Choose from our international menu
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
  );
};

export default MealsSummary;
