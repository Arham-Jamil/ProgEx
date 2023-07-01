// server/app.js
const express = require('express');
const path = require('path');
const {createDish, updateIngredientQuantity,createIngredient, closeDB, getTableFromQuery, queries, deleteIngredientById } = require('./database');
const app = express();

const cors = require('cors');
// Middleware to parse JSON requests
app.use(express.json());

//allows client to access server resources (to display dishes etc.)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

//apparently needed for post requests
app.use(cors());

// API endpoints


//muss noch angepasst werden
app.post('/ingredients', async (req, res) => {
  console.log('req.body: ', req.body);
  const {Name: name, Quantity: quantity,UnitOfMeasurement: unitOfMeasurement} = req.body;
  console.log('name in post: ',name);
  try {
    const ingredientId = await createIngredient(name, quantity, unitOfMeasurement);
    res.status(201).json({ id: ingredientId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

//gets called by await axios.delete(`http://localhost:3001/ingredients/${id}`);
app.delete('/ingredients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteIngredientById(id);
    res.status(200).json({ message: `Ingredient with ID ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete ingredient' });
  }
});

//gets called by axios.patch
app.patch('/ingredients/:id', async (req, res) => {
  const { id } = req.params;
  const { Quantity } = req.body;
  try {
    await updateIngredientQuantity(id, Quantity);
    res.sendStatus(204); // Respond with a success status code (No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update ingredient quantity' });
  }
});




/*implement here every other app.get() which is handled differently
*
*
*
*/

//Route handler. every table as a path results in getting a SELECT * from said table
//  old: /ordereddishes', '/ordereddrinks', '/categorydish', '/categorydrinks', '/extras', '/ingredients', '/staffaccount', '/drinks', '/dishes', '/orders', '/drinksjoin', '/dishesjoin'
app.get(['/:resource'], async (req, res) => {
  const resource = req.params.resource.toLowerCase();
  //const resource = req.path.slice(1).toLowerCase();
  try {

    const query = queries[resource]; //vllt später mit switch ersetzen

    if (!query) { 
      console.log("Query: "+query);
      console.log("Resource: "+resource);
      res.status(404).json({ error: 'Resource not found' });
      return;
    }
    const resourceData = await getTableFromQuery(query);
    res.json(resourceData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch resource' });
  }
});

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../client/build')));

// Serve the React frontend for any remaining requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

module.exports = app;


