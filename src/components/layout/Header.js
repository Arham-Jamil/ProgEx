import { Fragment } from "react";
import mainheaderImage from "../../assests/main-qimg-981ceae310b1cf68e367f110ae991ff0-lq.jpeg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import LoginButton from "../../Login/LoginButton";


//this the top bar of the application.
//It contains the cart button(HeaderCartBtn), app title etc
//fragment allows you to group various elements in a component without having to add them to app.js
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ZeApp</h1> 
        <LoginButton/>
        {/* this ths cart btn       */}
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mainheaderImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
