import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableExtras = () => {

    const [extras, setExtras] = useState([]);

    const fetchExtras = async () => {
      try {
        const response = await axios.get('http://localhost:3001/extrasAvailable');
        setExtras(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchExtras();
    }, []);
  
    return (
      <section>
        {/* <h2>Extras</h2> */}
        <p>Extras have to be mentioned in the comment field before placing your order.</p>
        <ul>
          {extras.map((extra) => (
            <li key={extra.ID}>
              <strong>{extra.Name}</strong>
              <div>Price: {extra.Price} €</div>
            </li>
          ))}
        </ul>
      </section>
    );
  };

export default AvailableExtras;
