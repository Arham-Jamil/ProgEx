import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newDish, setNewDish] = useState({
    Name: '',
    Price: '',
    CategoryName: '',
    Description: '',
    Available: false,
    Quantity: '',
    ImagePath: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [editingDish, setEditingDish] = useState({
    Name: '',
    Price: '',
    CategoryName: '',
    Category_ID: '', 
    Description: '',
    Available: false,
    Quantity: '',
    ImagePath: '',
  });
  

  useEffect(() => {
    fetchDishes();
    fetchCategories();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/dishesjoin');
      //sorts dishes before displaying them
      const sortedDishes = response.data.sort((a, b) => {
        // Sort by availability
        if (a.Available && !b.Available) {
          return -1;
        } else if (!a.Available && b.Available) {
          return 1;
        }
        // Sort by category ID if availability is the same
        return a.Category_ID - b.Category_ID;
      });

      setDishes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/CategoryDish');
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
        setEditingDish((prevState) => ({
          ...prevState,
          [name]: selectedCategory ? selectedCategory.Name : '',
          Category_ID: selectedCategory ? selectedCategory.ID : '',
        }));
      } else {
        setEditingDish((prevState) => ({
          ...prevState,
          [name]: inputValue,
        }));
      }
    } else {
      if (name === 'CategoryName') {
        const selectedCategory = categories.find((category) => category.Name === value);
        setNewDish((prevState) => ({
          ...prevState,
          [name]: selectedCategory ? selectedCategory.Name : '',
          Category_ID: selectedCategory ? selectedCategory.ID : '',
        }));
      } else {
        setNewDish((prevState) => ({
          ...prevState,
          [name]: inputValue,
        }));
      }
    }
  };
  
  

  const handleAddDish = async () => {

    //input validation
    if (!(/^\d+(\.\d{1,2})?$/.test(newDish.Price)) //floating point number
    || newDish.Name.trim() === ""  //not empty
    || !(/^-?1$|^[0-9]+$/.test(newDish.Quantity)) //not empty
    || dishes.some((dish) => dish.Name.trim() === newDish.Name.trim())) { //unique

    alert("Failed! Check your input!!");
    return;
  }

    try {
      await axios.post('http://localhost:3001/dishes', newDish);
      setNewDish({
        Name: '',
        Price: '',
        CategoryName: '',
        Description: '',
        Available: false,
        Quantity: '',
        ImagePath: '',
      });
      fetchDishes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditDish = async (id) => {
    console.log('editing dish: ', editingDish);
       //input validation
       if (
      !(/^\d+(\.\d{1,2})?$/.test(editingDish.Price)) //floating point number
       || editingDish.Name.trim() === ""  //not empty
       || !(/^-?1$|^[0-9]+$/.test(editingDish.Quantity)) //not empty

       //geht nicht weil in dishes ja der name der zu editieren ist steht
      //  || dishes.some((dish) => dish.Name.trim() === editingDish.Name.trim())
       ) { //unique
   
       alert("Failed! Check your input!!");
       return;
     }
    try {
      await axios.patch(`http://localhost:3001/dishes/${id}`, editingDish);
      console.log('handleEdit: editDish',editingDish);
      setEditingId(null);
      fetchDishes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartEdit = (id, dish) => {
    setEditingId(id);
    setEditingDish(dish);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingDish({
      Name: '',
      Price: '',
      CategoryName: '',
      Description: '',
      Available: false,
      Quantity: '',
      ImagePath: '',
    });
  };

  const handleRemoveDish = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete the dish? You won´t be able to restore it");
    if(!confirmed) return;
    console.log('removing from view: ', id);
    try {
      await axios.delete(`http://localhost:3001/dishes/${id}`); //remove from table view
      fetchDishes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Dishes</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Available</th>
            <th>Quantity</th>
            <th>Image Path</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr 
            key={dish.ID}
            style={{ //conditionally formatting of dishes depending on quantity and available value
              backgroundColor: dish.Quantity === 0 ? 'red' :
              !dish.Available ? '#fac3c3' : 'inherit' }}>
              <td>
                {editingId === dish.ID ? (
                  <input
                    type="text"
                    name="Name"
                    value={editingDish.Name}
                    onChange={handleInputChange}
                  />
                ) : (
                  dish.Name
                )}
              </td>
              <td>
                {editingId === dish.ID ? (
                  <input
                    type="text"
                    name="Price"
                    value={editingDish.Price}
                    onChange={handleInputChange}
                  />
                ) : (
                  dish.Price
                )}
              </td>
              <td>
                {editingId === dish.ID ? (
                  <select
                    name="CategoryName"
                    value={editingDish.CategoryName}
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
                  dish.CategoryName
                )}
              </td>
              <td>
                {editingId === dish.ID ? (
                  <input
                    type="text"
                    name="Description"
                    value={editingDish.Description}
                    onChange={handleInputChange}
                  />
                ) : (
                  dish.Description
                )}
              </td>
              <td>
                {editingId === dish.ID ? (
                  <input
                    type="checkbox"
                    name="Available"
                    checked={editingDish.Available}
                    onChange={handleInputChange}
                  />
                ) : (
                  dish.Available ? 'Yes' : 'No'
                )}
              </td>
              <td>
                {editingId === dish.ID ? (
                  <input
                    type="text"
                    name="Quantity"
                    value={editingDish.Quantity}
                    onChange={handleInputChange}
                  />
                ) : (
                  dish.Quantity
                )}
              </td>
              <td>
                {editingId === dish.ID ? (
                  <input
                    type="text"
                    name="ImagePath"
                    value={editingDish.ImagePath}
                    onChange={handleInputChange}
                  />
                ) : (
                  dish.ImagePath
                )}
              </td>
              <td>
                {editingId === dish.ID ? (
                  <div>
                    <button onClick={() => handleEditDish(dish.ID)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div style={{ display: 'inline-flex' }}>
                  <button onClick={() => handleStartEdit(dish.ID, dish)}>Edit</button>
                  <button onClick={() => handleRemoveDish(dish.ID)}>Remove</button>
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
                value={newDish.Name}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="Price"
                value={newDish.Price}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <select
                name="CategoryName"
                value={newDish.CategoryName}
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
                value={newDish.Description}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <label>
                <input
                  type="checkbox"
                  name="Available"
                  checked={newDish.Available}
                  onChange={handleInputChange}
                />
                Available
              </label>
            </td>
            <td>
              <input
                type="text"
                name="Quantity"
                value={newDish.Quantity}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="ImagePath"
                value={newDish.ImagePath}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <button onClick={handleAddDish}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditDishes;
