import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './EditExtras.css';
import StaffNavHeader from './StaffNavHeader';
import './StaffViewPages.css';

const EditExtras = () => {
  const [extras, setExtras] = useState([]);
  const [newExtra, setNewExtra] = useState({ Name: '', Price: '', Available: false });

  useEffect(() => {
    fetchExtras();
  }, []);

  const fetchExtras = async () => {
    try {
      const response = await axios.get('http://localhost:3001/extras');
      const sortedExtras = response.data.sort((a, b) => {
        if (a.Available && !b.Available) {
          return -1; // a is available, b is not available
        } else if (!a.Available && b.Available) {
          return 1; // a is not available, b is available
        } else {
          return 0; // both have same availability, maintain original order
        }
      });
      setExtras(sortedExtras);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setNewExtra((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  //geht das nicht effizienter?
  const toggleAvailableValue = (id) => {
    setExtras((prevExtras) =>
      prevExtras.map((extra) => {
        if (extra.ID === id) {
          console.log('prevExtras.map() id: ', id);
          console.log('prevExtras.map() extra.ID: ', extra.ID);
          handleChangeAvailable(id, !extra.Available); //testing

          return {
            ...extra,
            Available: !extra.Available,
          };
        }
        return extra;
      })
    );
  };

  const handleChangeAvailable = async (id, newAvailable) => {
    console.log('handleChangeAvailable() id: ', id);
    console.log('handleChangeAvailable() newAvailable: ', newAvailable);

    try {
      await axios.patch(`http://localhost:3001/extras/${id}`, {
        Available: newAvailable,
      });
      fetchExtras();
    } catch (error) {
      console.error(error);
    }
  };


  const handleAddExtra = async () => {
    //input validation
    if (!(/^\d+(\.\d{1,2})?$/.test(newExtra.Price))
      || newExtra.Name.trim() === ""
      || extras.some((extra) => extra.Name.trim() === newExtra.Name.trim())
      ) {
      alert("Failed! Check your input!!");
      return;
    }
    
    try {
      await axios.post('http://localhost:3001/extras', newExtra);
      setNewExtra({ Name: '', Price: '', Available: false });
      fetchExtras();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteExtra = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/extras/${id}`);
      fetchExtras();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">

    <StaffNavHeader/>
    
      <h2>Edit Extras</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {extras.map((extra) => (
            <tr key={extra.ID}
            style={{ //conditionally formatting of dishes depending on quantity and available value
              backgroundColor: extra.Available === 0 ? '#ff8178' :'inherit' }}>
              <td>{extra.Name}</td>
              {/* //hier kann man vllt noch die Währung variable machen */}
              <td>{extra.Price + " €"}</td> 
              <td>
                <button
                  className={`toggle-btn ${extra.Available ? 'available' : 'unavailable'}`}
                  onClick={() => toggleAvailableValue(extra.ID)}
                >
                  {extra.Available ? 'Yes' : 'No'}
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteExtra(extra.ID)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                name="Name"
                value={newExtra.Name}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="Price"
                value={newExtra.Price} 
                onChange={handleInputChange}
              />
            </td>
            <td>
              <label>
                <input
                  type="checkbox"
                  name="Available"
                  checked={newExtra.Available}
                  onChange={handleInputChange}
                />
                Available
              </label>
            </td>
            <td>
              <button onClick={handleAddExtra}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditExtras;
