import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditDrinks = () => {
  const [drinks, setdrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newDrink, setnewDrink] = useState({
    Name: '',
    Price: '',
    CategoryName: '',
    Description: '',
    Available: false,
    Volume: '',
    ImagePath: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [editingDrink, seteditingDrink] = useState({
    Name: '',
    Price: '',
    CategoryName: '',
    Category_ID: '', 
    Description: '',
    Available: false,
    Volume: '',
    ImagePath: '',
  });
  

  useEffect(() => {
    fetchdrinks();
    fetchCategories();
  }, []);

  const fetchdrinks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/drinksjoin');
      //sorts drinks before displaying them
      const sorteddrinks = response.data.sort((a, b) => {
        // Sort by availability
        if (a.Available && !b.Available) {
          return -1;
        } else if (!a.Available && b.Available) {
          return 1;
        }
        // Sort by category ID if availability is the same
        return a.Category_ID - b.Category_ID;
      });

      setdrinks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categorydrinks');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
  
    if (editingId) {
      if (name === 'CategoryName') {
        const selectedCategory = categories.find((category) => category.Name === value);
        seteditingDrink((prevState) => ({
          ...prevState,
          [name]: selectedCategory ? selectedCategory.Name : '',
          Category_ID: selectedCategory ? selectedCategory.ID : '',
        }));
      } else {
        seteditingDrink((prevState) => ({
          ...prevState,
          [name]: inputValue,
        }));
      }
    } else {
      if (name === 'CategoryName') {
        const selectedCategory = categories.find((category) => category.Name === value);
        setnewDrink((prevState) => ({
          ...prevState,
          [name]: selectedCategory ? selectedCategory.Name : '',
          Category_ID: selectedCategory ? selectedCategory.ID : '',
        }));
      } else {
        setnewDrink((prevState) => ({
          ...prevState,
          [name]: inputValue,
        }));
      }
    }
  };
  
  

  const handleAddDrink = async () => {
      //input validation
      if (!(/^\d+(\.\d{1,2})?$/.test(newDrink.Price)) //floating point number
      || newDrink.Name.trim() === ""  //not empty
      || !(/^[0-9]+$/.test(newDrink.Volume))
      || drinks.some((drink)=> drink.Name.trim() === newDrink.Name.trim())) { //unique
  
      alert("Failed! Check your input!!");
      return;
    }
    try {
      await axios.post('http://localhost:3001/drinks', newDrink);
      setnewDrink({
        Name: '',
        Price: '',
        CategoryName: '',
        Description: '',
        Available: false,
        Volume: '',
        ImagePath: '',
      });
      fetchdrinks();
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemoveDrink = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this drink? You won´t be able to restore it");
    if(!confirmed) return;
    console.log('removing from view: ', id);
    try {
      await axios.delete(`http://localhost:3001/drinks/${id}`); //remove from table view
      fetchdrinks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditDrink = async (id) => {
       //input validation
       if (!(/^\d+(\.\d{1,2})?$/.test(editingDrink.Price)) //floating point number
       || editingDrink.Name.trim() === ""  //not empty
       || !(/^[0-9]+$/.test(editingDrink.Volume))
       ) { //unique
   
       alert("Failed! Check your input!!");
       return;
     }
    try {
      await axios.patch(`http://localhost:3001/drinks/${id}`, editingDrink);
      console.log('handleEdit: editdrink',editingDrink);
      setEditingId(null);
      fetchdrinks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartEdit = (id, drink) => {
    setEditingId(id);
    seteditingDrink(drink);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    seteditingDrink({
      Name: '',
      Price: '',
      CategoryName: '',
      Description: '',
      Available: false,
        Volume: '',
      ImagePath: '',
    });
  };

  return (
    <div className="container">
      <h2>Edit drinks</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Available</th>
            <th>Volume</th>
            <th>Image Path</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drinks.map((drink) => (
            <tr 
            key={drink.ID}
            style={{ //conditionally formatting
              backgroundColor:!drink.Available ? '#fac3c3' : 'inherit' }}>
              <td>
                {editingId === drink.ID ? (
                  <input
                    type="text"
                    name="Name"
                    value={editingDrink.Name}
                    onChange={handleInputChange}
                  />
                ) : (
                  drink.Name
                )}
              </td>
              <td>
                {editingId === drink.ID ? (
                  <input
                    type="text"
                    name="Price"
                    value={editingDrink.Price}
                    onChange={handleInputChange}
                  />
                ) : (
                  drink.Price
                )}
              </td>
              <td>
                {editingId === drink.ID ? (
                  <select
                    name="CategoryName"
                    value={editingDrink.CategoryName}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.ID} value={category.Name}>
                        {category.Name}
                      </option>
                    ))}
                  </select>
                ) : (
                  drink.CategoryName
                )}
              </td>
              <td>
                {editingId === drink.ID ? (
                  <input
                    type="text"
                    name="Description"
                    value={editingDrink.Description}
                    onChange={handleInputChange}
                  />
                ) : (
                  drink.Description
                )}
              </td>
              <td>
                {editingId === drink.ID ? (
                  <input
                    type="checkbox"
                    name="Available"
                    checked={editingDrink.Available}
                    onChange={handleInputChange}
                  />
                ) : (
                  drink.Available ? 'Yes' : 'No'
                )}
              </td>
              <td>
                {editingId === drink.ID ? (
                  <input
                    type="text"
                    name="Volume"
                    value={editingDrink.Volume} 
                    onChange={handleInputChange}
                  />
                ) : (
                  drink.Volume + " ml"
                )}
              </td>
              <td>
                {editingId === drink.ID ? (
                  <input
                    type="text"
                    name="ImagePath"
                    value={editingDrink.ImagePath}
                    onChange={handleInputChange}
                  />
                ) : (
                  drink.ImagePath
                )}
              </td>
              <td>
                {editingId === drink.ID ? (
                  <div>
                    <button onClick={() => handleEditDrink(drink.ID)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div style={{ display: 'inline-flex' }}>
                  <button onClick={() => handleStartEdit(drink.ID, drink)}>Edit</button>
                  <button onClick={() => handleRemoveDrink(drink.ID)}>Remove</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                name="Name"
                value={newDrink.Name}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="Price"
                value={newDrink.Price}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <select
                name="CategoryName"
                value={newDrink.CategoryName}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.ID} value={category.Name}>
                    {category.Name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="text"
                name="Description"
                value={newDrink.Description}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <label>
                <input
                  type="checkbox"
                  name="Available"
                  checked={newDrink.Available}
                  onChange={handleInputChange}
                />
                Available
              </label>
            </td>
            <td>
              <input
                type="text"
                name="Volume"
                value={newDrink.Volume}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="ImagePath"
                value={newDrink.ImagePath}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <button onClick={handleAddDrink}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditDrinks;
