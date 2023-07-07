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
      setEditingDish((prevState) => ({
        ...prevState,
        [name]: inputValue,
      }));
    } else {
      setNewDish((prevState) => ({
        ...prevState,
        [name]: inputValue,
      }));
    }
  };

  const handleAddDish = async () => {
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
    try {
      await axios.patch(`http://localhost:3001/dishes/${id}`, editingDish);
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
            <tr key={dish.ID}>
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
                  <button onClick={() => handleStartEdit(dish.ID, dish)}>Edit</button>
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
                    //work around weil bin grad faul, schreibe in categoryName die ID rein
                  <option key={category.ID} value={category.ID}>
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
