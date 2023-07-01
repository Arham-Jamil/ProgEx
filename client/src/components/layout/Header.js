import { Fragment } from "react";
import mainheaderImage from "../../assests/frontPageImage.jpeg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { Link } from "react-router-dom"
import { FiLogIn } from "react-icons/fi";

//this the top bar of the application.
//It contains the cart button(HeaderCartBtn), app title etc
//fragment allows you to group various elements in a component without having to add them to app.js
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        
        <h1>Restaurant Order App</h1>
        {/* this ths cart btn       */}

        {/* Das ist grad der LoginButton. den noch dem Layout anpassen und entweder ganz links oder ganz rechts im Banner */}
        {<Link to="/src/pages/Login.js" className="login-icon" style={{ marginRight: '300px' }}>
        <FiLogIn />
        </Link>}
        <HeaderCartButton onClick={props.onShowCart} />

      </header>
      <div className={classes["main-image"]}>
        <img src={mainheaderImage} alt="Frontpage Image" />
      </div>
    </Fragment>
  );
};

export default Header;
