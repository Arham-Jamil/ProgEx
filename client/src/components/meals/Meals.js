import RestaurantDescription from "./RestaurantDescription";
import AvailableMeals from "./AvailableMeals";
import { Fragment } from "react";
import ServerCalled from "../callServer/ServerCalled";
import HomePageNav from "./HomePageNav";
import AvailableExtras from "./AvailableExtras";

//Eigentlich nicht Meals sondern fast die ganze Homepage aber naja,
//WIESO IST DER SCHEI? EIGENTLICH IN MEALS UND NICHT IN HomePage.js ?!?!?!?!?
//grosser Text am Anfang, available meals and btn to call server are here
const Meals = () => {
  return (
    <Fragment>
      <RestaurantDescription />
      <div style={{ marginTop: '50px' }} >
        <HomePageNav />
      </div>
      <section id="Dishes">
        <h1 style={{ marginTop: '50px' }}> Dishes</h1>
      </section>
      <AvailableMeals />

      <section id="Drinks">
        <h1> Drinks</h1>
      </section>


      <section id="Extras">
        <h1> Extras</h1>
      </section>
      <AvailableExtras />

      {/* hier noch Extras und Drinks hinzufügen */}
      <ServerCalled />
    </Fragment>
  );
};

export default Meals;
