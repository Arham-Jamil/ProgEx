import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditCategoryDrinks = () => {
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [newCategoryDrink, setNewCategoryDrink] = useState({ Name: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingCategoryDrink, setEditingCategoryDrink] = useState({ Name: '' });
  const [drinks, setDrinks] = useState([]);


  useEffect(() => {
    fetchCategoryDrinks();
    fetchDrinks();
  }, []);

  const fetchCategoryDrinks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categorydrinks');
      setCategoryDrinks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDrinks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/drinksjoin');
      setDrinks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

//new new new new new new new new new new new new new new new new new new 
const handleRemoveCategoryDrink = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this category? You won´t be able to restore it");
  if(!confirmed) return;

  //map all dishes and compare category ID
  fetchDrinks();
  console.log('id: ',id );
  console.log('drinks',drinks);

  if(drinks.some((drink) =>
  drink.Category_ID === id //if category is in use
  )
  ){
    alert("Category is in use. Can´t delete!");
    return;
  }

  console.log('removing from view: ', id);
  try {
    await axios.delete(`http://localhost:3001/categorydrinks/${id}`); //remove from table view
    fetchCategoryDrinks();
  } catch (error) {
    console.error(error);
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingId) {
      setEditingCategoryDrink((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setNewCategoryDrink((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddCategoryDrink = async () => {
    //input validation
    if (newCategoryDrink.Name.trim() === "" //empty
      || categoryDrinks.some((catDrink) => catDrink.Name.trim() === newCategoryDrink.Name.trim()) //unique
    ) {
      alert("Failed! Check your input!!");
      return;
    }
    try {
      await axios.post('http://localhost:3001/categorydrinks', { Name: newCategoryDrink.Name });
      setNewCategoryDrink({ Name: '' });
      fetchCategoryDrinks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCategoryDrink = async (id) => {
    //input validation
    if (editingCategoryDrink.Name.trim() === "" //empty
      || categoryDrinks.some((catDrink) => catDrink.Name.trim() === editingCategoryDrink.Name.trim()
        && catDrink.ID !== id
      ) //unique
    ) {
      alert("Failed! Check your input!!");
      return;
    }
    try {
      await axios.patch(`http://localhost:3001/categorydrinks/${id}`, {
        Name: editingCategoryDrink.Name,
      });
      setEditingId(null);
      fetchCategoryDrinks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartEdit = (id, name) => {
    setEditingId(id);
    setEditingCategoryDrink({ Name: name });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingCategoryDrink({ Name: '' });
  };

  return (
    <div className="container">
      <h2>Edit Category Drinks</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryDrinks.map((categoryDrink) => (
            <tr key={categoryDrink.ID}>
              <td>
                {editingId === categoryDrink.ID ? (
                  <input
                    type="text"
                    name="Name"
                    value={editingCategoryDrink.Name}
                    onChange={handleInputChange}
                  />
                ) : (
                  categoryDrink.Name
                )}
              </td>
              <td>
                {editingId === categoryDrink.ID ? (
                  <div>
                    <button onClick={() => handleEditCategoryDrink(categoryDrink.ID)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div style={{ display: 'inline-flex' }}>

                  <button onClick={() => handleStartEdit(categoryDrink.ID, categoryDrink.Name)}>  Edit</button>
                  <button onClick={() => handleRemoveCategoryDrink(categoryDrink.ID)}>Remove</button>
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
                value={newCategoryDrink.Name}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <button onClick={handleAddCategoryDrink}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditCategoryDrinks;
