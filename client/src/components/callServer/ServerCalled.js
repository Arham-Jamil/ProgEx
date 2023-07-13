import {useState} from "react";
import "./ServerCalled.css";
import axios from 'axios';


const ServerCalled = (props) =>{
    const [popup, setPopup] = useState(false);

    const togglePopup = () => {
      console.log('serverCalled: ');
    setPopup(!popup);
    ///////
    const queryParams = new URLSearchParams(window.location.search); // URL parameter
    callServer(queryParams.get('tableNumber'));
  };


  const callServer = async (tableNumber) => {
    try {
      await axios.patch('http://localhost:3001/ordersCallServer', {tableNumber});
    } catch (error) {
      console.error(error);
    }
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
                A server is on their way!
              </p>
              <button className="close-modal" onClick={() => setPopup(!popup)} style={{marginTop: '30px'}}>
               Confirm {'\u2713'}
              </button>
            </div>
          </div>
        )}
      </>
    )
}

export default ServerCalled;