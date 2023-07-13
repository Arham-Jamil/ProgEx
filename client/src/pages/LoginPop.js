import { Fragment, useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import axios from "axios";
import { SHA256 } from "crypto-js";
import Modal from "react-modal";

const customModalStyles = {
  content: {
    width: "17rem",
    height: "5rem",
    margin: "auto",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

const LoginPop = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordHashed = SHA256(password).toString();

    try {
      const response = await axios.post("http://localhost:3001/login", { username, passwordHashed });
      console.log("response ", response.data);
      if (response.data.success) {
        login();
        setLoggedIn(true);
        console.log("logged in");
      } else {
        alert("Incorrect username or password");
        console.log("login failed");
      }

      //For testing !!!!!!!!!!!!!!!
      // login();
      // setLoggedIn(true);


    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };


  const handleLoginButtonClick = () => {
    setShowPopup(true);
  };

  if (loggedIn) {
    return <Navigate to="/OrdersPage" />;
  }

  return (
    <Fragment>
      <button onClick={handleLoginButtonClick} 
      style={{marginBottom: '10px',backgroundColor: 'white', width: '100px',borderRadius: '10px', marginLeft: '1px'
}}>Login</button>

      {showPopup && (
        <Modal isOpen={true} onRequestClose={() => setShowPopup(false)} style={customModalStyles}>
          <form>
            <label htmlFor="email">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              style={{width:'10rem', marginLeft:'5px'}}
              autoFocus 
            />
            <label htmlFor="password" >Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="******"
              style={{width:'10rem' , marginLeft:'10px'}}
            />
                <button type="button" onClick={handleCancel} style={{marginTop: '10px', marginRight:'146px', backgroundColor: '#f77b72'}}>
              Cancel
            </button>
            <button type="submit" onClick={handleSubmit} style={{backgroundColor: '#3697fe' }} >
              Log in
            </button>

        
          </form>
        </Modal>
      )}
    </Fragment>
  );
};

export default LoginPop;
