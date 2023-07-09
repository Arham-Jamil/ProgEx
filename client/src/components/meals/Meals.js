import AvailableMeals from "./AvailableMeals";
import { Fragment } from "react";
import ServerCalled from "../callServer/ServerCalled";

//Eigentlich nicht Meals sondern fast die ganze Homepage aber naja,
//WIESO IST DER SCHEI? EIGENTLICH IN MEALS UND NICHT IN HomePage.js ?!?!?!?!?
//grosser Text am Anfang, available meals and btn to call server are here
const Meals = () => {
  return (
    <Fragment>
      
      <section id="Dishes">
        <h1 style={{ marginTop: '50px' }}> Dishes</h1>
      </section>
      <AvailableMeals />

      {/* kann man das auch einfach nach HomePage verschieben? dann braucht man Meals.js gar nicht mehr  */}
      <ServerCalled />
    </Fragment>
  );
};

export default Meals;
