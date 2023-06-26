import CartProvider from "../store/CartProvider"
import Header from "../components/layout/Header"
import Meals from "../components/meals/Meals"
import Cart from "../components/cart/Cart"
import { useState } from "react"


const HomePage = () =>{

  const [cartIsShown, setCartIsShown] = useState(false);
  const [loginIsShown, setLoginIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
    return(
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}

      <Header onShowCart={showCartHandler} onClose={hideCartHandler} />
      <main>
        <Meals />
        {/* <button onClick={toggleLogin}>login</button> */}
      </main>
    </CartProvider>
    )
}

export default HomePage