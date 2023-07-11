import CartProvider from "../store/CartProvider"
import Header from "../components/layout/Header"
import Cart from "../components/cart/Cart"
import { useState } from "react"
import HomePageNav from "../components/meals/HomePageNav"
import RestaurantDescription from "../components/meals/RestaurantDescription"
import AvailableExtras from "../components/meals/AvailableExtras"
import AvailableDrinks from "../components/meals/AvailableDrinks"
import AvailableMeals from "../components/meals/AvailableMeals"
import ServerCalled from "../components/callServer/ServerCalled"
import Footer from "../components/layout/Footer"
import LoginPop from "./LoginPop"

const HomePage = () => {

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (

    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} onClose={hideCartHandler} />
      <main>
        <RestaurantDescription />
        <div style={{ marginTop: '50px' }} >
        </div>
     

        <section id="Dishes">
        <h1 style={{ marginTop: '50px',borderBottom: '4px solid black', fontSize: 40 , textAlign: 'center'}}> Dishes</h1>
      </section>
      <AvailableMeals />

        <section id="Drinks">
        <h1 style={{ marginTop: '50px',borderBottom: '4px solid black', fontSize: 40 , textAlign: 'center'}}> Drinks</h1>
        <AvailableDrinks/>
      </section>

      <section id="Extras">
        <h1 style={{ marginTop: '50px',borderBottom: '4px solid black', fontSize: 40 , textAlign: 'center'}}> Extras</h1>
      </section>
      <AvailableExtras />
    <Footer/>
        </main>
    </CartProvider>
  )
}

export default HomePage