import { useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Meals from "./components/meals/Meals";
import Cart from "./components/cart/Cart";
import CartProvider from "./store/CartProvider";
import Login from "./Login/Login";


function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [loginIsShown, setLoginIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  // this to go to the login page
  const toggleLogin = () =>{
    setLoginIsShown(true)
  }
  if(loginIsShown){
    return <Login/>
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}

      <Header onShowCart={showCartHandler} onClose={hideCartHandler} />
      <main>
        <Meals />
        <button onClick={toggleLogin}>login</button>
      </main>
    </CartProvider>
  );
}

export default App;
