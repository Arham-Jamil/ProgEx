import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditCategoryDish = () => {
  const [categoryDishes, setCategoryDishes] = useState([]);
  const [newCategoryDish, setNewCategoryDish] = useState({ Name: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingCategoryDish, setEditingCategoryDish] = useState({ Name: '' });
  const [dishes, setDishes] = useState([]);


  useEffect(() => {
    fetchCategoryDishes();
    fetchDishes();
  }, []);

  const fetchCategoryDishes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categorydish');
      setCategoryDishes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDishes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/dishesjoin');
      setDishes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingId) {
      setEditingCategoryDish((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setNewCategoryDish((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddCategoryDish = async () => {
    //input validation
    if (newCategoryDish.Name.trim() === "" //empty
      || categoryDishes.some((catDish) => catDish.Name.trim() === newCategoryDish.Name.trim()) //unique
    ) {
      alert("Failed! Check your input!!");
      return;
    }
    try {
      await axios.post('http://localhost:3001/categorydish', { Name: newCategoryDish.Name });
      setNewCategoryDish({ Name: '' });
      fetchCategoryDishes();
    } catch (error) {
      console.error(error);
    }
  };
//new new new new new new new new new new new new new new new new new new 
  const handleRemoveCategoryDish = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this category? You won´t be able to restore it");
    if(!confirmed) return;

    //map all dishes and compare category ID
    fetchDishes();
    console.log('id: ',id );
    console.log('dishes',dishes);

    if(dishes.some((dish) =>
    dish.Category_ID === id //if category is in use
    )
    ){
      alert("Category is in use. Can´t delete!");
      return;
    }

    console.log('removing from view: ', id);
    try {
      await axios.delete(`http://localhost:3001/categorydish/${id}`); //remove from table view
      fetchCategoryDishes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCategoryDish = async (id) => {
    // Input validation
    if (
      editingCategoryDish.Name.trim() === "" || // Empty name
      categoryDishes.some(
        (catDish) =>
          catDish.Name.trim() === editingCategoryDish.Name.trim() &&
          catDish.ID !== id // Unique name except for the current edited category
      )
    ) {
      alert("Failed! Check your input!!");
      return;
    }
    try {
      await axios.patch(`http://localhost:3001/categorydish/${id}`, {
        Name: editingCategoryDish.Name,
      });
      setEditingId(null);
      fetchCategoryDishes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartEdit = (id, name) => {
    setEditingId(id);
    setEditingCategoryDish({ Name: name });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingCategoryDish({ Name: '' });
  };

  return (
    <div className="container">
      <h2>Edit Category Dishes</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryDishes.map((categoryDish) => (
            <tr key={categoryDish.ID}>
              <td>
                {editingId === categoryDish.ID ? (
                  <input
                    type="text"
                    name="Name"
                    value={editingCategoryDish.Name}
                    onChange={handleInputChange}
                  />
                ) : (
                  categoryDish.Name
                )}
              </td>
              <td>
                {editingId === categoryDish.ID ? (
                  <div>
                    <button onClick={() => handleEditCategoryDish(categoryDish.ID)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                 <div style={{ display: 'inline-flex' }}>
                  <button onClick={() => handleStartEdit(categoryDish.ID, categoryDish.Name)}> Edit</button>
                  <button onClick={() => handleRemoveCategoryDish(categoryDish.ID)}>Remove</button>
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
                value={newCategoryDish.Name}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <button onClick={handleAddCategoryDish}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditCategoryDish;
