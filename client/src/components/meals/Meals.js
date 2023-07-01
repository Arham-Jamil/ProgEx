import RestaurantDescription from "./RestaurantDescription";
import AvailableMeals from "./AvailableMeals";
import { Fragment } from "react";
import ServerCalled from "../callServer/ServerCalled";

//grosser Text am Anfang, available meals and btn to call server are here
const Meals = () => {
  return (
    <Fragment>
      <RestaurantDescription />
      <AvailableMeals />
      <ServerCalled />
    </Fragment>
  );
};

export default Meals;
