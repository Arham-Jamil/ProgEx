import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import './IngredientsList.css';

const IngredientsList = () => {
  
  const [ingredients, setIngredients] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [newIngredient, setNewIngredient] = useState({
    Name: '',
    Quantity: '',
    UnitOfMeasurement: '',
  });

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('http://localhost:3001/ingredients');
      setIngredients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortData = (data, column, direction) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (a[column] < b[column]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  };

  const sortedIngredients = sortColumn
    ? sortData(ingredients, sortColumn, sortDirection)
    : ingredients;

  const renderSortIcon = (column) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        return <FaSortUp />;
      } else {
        return <FaSortDown />;
      }
    } else {
      return <FaSort />;
    }
  };

  const handleDeleteIngredient = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/ingredients/${id}`);
      fetchIngredients();
    } catch (error) {
      console.error(error);
    }
  };

  //die beiden Funktionen kann man bestimmt zusammenfassen aber grad kein Bock
  const handleInputChange = (e) => {
    // console.log('inside handleInputChange e name: ',e.target.name);
    // console.log('inside handleInputChange value: ', e.target.value);
    setNewIngredient((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
const handleInputChangeForUpdatingQuantity = (e, index) => {
  const { name, value } = e.target;
  setIngredients((prevState) => {
    const updatedIngredients = [...prevState];
    updatedIngredients[index][name] = value;
    return updatedIngredients;
  });
};

  const handleAddIngredient = async () => {

    if (!(/^[0-9]+$/.test(newIngredient.Quantity))
      || newIngredient.UnitOfMeasurement === "" //leerzeichen geht aber, muss noch gefixt werden
      || newIngredient.Name === "") { //hier muss noch auch unique name getestet werden
      console.error("Keine Zahl");
      alert("Failed! Check your input!!");
      return;
    }
    try {
      console.log('accessing db...\n new ingredient: ', newIngredient);
      await axios.post('http://localhost:3001/ingredients', newIngredient);
      setNewIngredient({
        Name: '',
        Quantity: '',
        UnitOfMeasurement: '',
      });
      console.log('ingredient saved \nfetching Ingredients...');
      fetchIngredients();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditQuantity = async (id, newQuantity) => {
    try {
      await axios.patch(`http://localhost:3001/ingredients/${id}`, {
        Quantity: newQuantity,
      });
      //updating table after successful table insert
      fetchIngredients();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ingredients-list-container">
      <h1 className="ingredients-list-heading">Ingredients List</h1>
      <table className="ingredients-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('Name')}>
              Name {renderSortIcon('Name')}
            </th>
            <th onClick={() => handleSort('Quantity')}>
              Quantity {renderSortIcon('Quantity')}
            </th>
            <th onClick={() => handleSort('UnitOfMeasurement')}>
              Unit of Measurement {renderSortIcon('UnitOfMeasurement')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {/* Maps all Ingredients from db into table with delete button */}
          {sortedIngredients.map((ingredient, index) => (
            <tr key={ingredient.ID}>
              <td>{ingredient.Name}</td>
              <td>
                <input
                  type="text"
                  name= "Quantity" //set e.target.name here
                  value={ingredient.Quantity}
                  onChange={(e) => handleInputChangeForUpdatingQuantity(e, index)}
                   onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      console.log('enter pressed \n ingredient.ID: ',ingredient.ID);
                      console.log('e.target.value: ',e.target.value);
                     handleEditQuantity(ingredient.ID, e.target.value);
                    }
                   }}
                />
              </td>
              <td>{ingredient.UnitOfMeasurement}</td>
              <td>
                <button onClick={() => handleDeleteIngredient(ingredient.ID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}




          <tr>
            <td>
              <input
                type="text"
                name="Name"
                value={newIngredient.Name}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="Quantity"
                value={newIngredient.Quantity}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="UnitOfMeasurement"
                value={newIngredient.UnitOfMeasurement}
                onChange={handleInputChange} //hier eher mit dropdown menu auswählen lassen?
              />
            </td>
            <td>
              <button onClick={handleAddIngredient} style={{ backgroundColor: 'green' }}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IngredientsList;
