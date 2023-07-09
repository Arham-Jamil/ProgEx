import CartProvider from "../store/CartProvider"
import Header from "../components/layout/Header"
import Meals from "../components/meals/Meals"
import Cart from "../components/cart/Cart"
import { useState } from "react"
import HomePageNav from "../components/meals/HomePageNav"
import RestaurantDescription from "../components/meals/RestaurantDescription"
import AvailableExtras from "../components/meals/AvailableExtras"
import AvailableDrinks from "../components/meals/AvailableDrinks"

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
          <HomePageNav />
        </div>

        <Meals />

        <section id="Drinks">
        <h1> Drinks</h1>
        <AvailableDrinks/>
      </section>

      <section id="Extras">
        <h1> Extras</h1>
      </section>
      <AvailableExtras />

      </main>
    </CartProvider>
  )
}

export default HomePage