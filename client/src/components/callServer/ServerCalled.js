import {useState} from "react";
import "./ServerCalled.css";

const ServerCalled = (props) =>{
    const [popup, setPopup] = useState(false);

    const togglePopup = () => {
    setPopup(!popup);
    ///////
  };
    return(
        <>
        <button onClick={togglePopup} className="btn-modal">
          Call a server
        </button>
  
        {popup && (
          <div className="modal">
            <div onClick={togglePopup} className="overlay"></div>
            <div className="modal-content">
              <p>
                A server is on his way
              </p>
              <button className="close-modal" onClick={togglePopup}>
                CLOSE
              </button>
            </div>
          </div>
        )}
      </>
    )
}

export default ServerCalled;