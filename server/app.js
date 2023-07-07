// server/app.js
const express = require('express');
const path = require('path');
const {createDish, 
  updateIngredientQuantity, 
  createIngredient, 
  closeDB, 
  getTableFromQuery, 
  queries, 
  deleteIngredientById, 
  checkDishAvailability, 
  addOrder, 
  updateOrderStatus,
  updateDishOrderStatus,
  updateDrinkOrderStatus,
  deleteExtraById,
  createExtra,
  updateExtraAvailable,
  createCategoryDish,
  createCategoryDrink,
  updateCategoryDishName,
  updateCategoryDrinksName
} = require('./database');
//wenn alle mal gepusht haben import * as db from './database'; und dann alle functionen davon mit db. aufrufen

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


//------------- POST REQUESTS -----------------------------------------
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
app.post('/extras', async (req, res) => {
  console.log('req.body: ', req.body);
  const {Name: name, Price: price, Available: available} = req.body;
  console.log('name in post: ',name);
  try {
    const extraId = await createExtra(name, price, available);
    res.status(201).json({ id: extraId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.post('/categorydish', async (req, res) => {
  console.log('req.body: ', req.body);
  const {Name: name} = req.body;
  console.log('name in post: ',name);
  try {
    const categoryDishId = await createCategoryDish(name);
    res.status(201).json({ id: categoryDishId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add category Dish' });
  }
});

app.post('/categorydrinks', async (req, res) => {
  console.log('req.body: ', req.body);
  const {Name: name} = req.body;
  console.log('name in post: ',name);
  try {
    const categoryDrinkId = await createCategoryDrink(name);
    res.status(201).json({ id: categoryDrinkId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add category Drink' });
  }
});


//------------- DELETE REQUESTS -----------------------------------------
//gets called by axios.delete(`http://localhost:3001/ingredients/${id}`) zb
app.delete('/extras/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteExtraById(id);
    res.status(200).json({ message: `Extra with ID ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete extra' });
  }
});
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

//------------- Patch/Update REQUESTS --------------------------------
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

app.patch('/extras/:id', async (req, res) => {
  const { id } = req.params;
  const { Available } = req.body;
  console.log('app.patch() id: ', id);
  console.log('app.patch() Available: ', Available);

  try {
    await updateExtraAvailable(id, Available);
    res.sendStatus(204); // Respond with a success status code (No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update extra available' });
  }
});
app.patch('/categorydish/:id', async (req, res) => {
  const { id } = req.params;
  const { Name } = req.body;
  console.log('app.patch() id: ', id);
  console.log('app.patch() Name: ', Name);

  try {
    await updateCategoryDishName(id, Name);
    res.sendStatus(204); // Respond with a success status code (No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update dish category name' });
  }
});
app.patch('/categorydrinks/:id', async (req, res) => {
  const { id } = req.params;
  const { Name } = req.body;
  console.log('app.patch() id: ', id);
  console.log('app.patch() Name: ', Name);

  try {
    await updateCategoryDrinksName(id, Name);
    res.sendStatus(204); // Respond with a success status code (No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update drink category name' });
  }
});




app.patch('/orderedDishes', async (req, res) => {
  const orderID = req.body.orderId;
  const Status = req.body.newStatus;
  console.log(orderID);
  try {
    await updateDishOrderStatus(orderID, Status);
    res.sendStatus(204); // Respond with a success status code (No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update ordered Dish' });
  }
});

app.patch('/orderedDrinks', async (req, res) => {
  const orderID = req.body.orderId;
  const Status = req.body.newStatus;
  try {
    await updateDrinkOrderStatus('orderedDrinks', orderID, Status);
    res.sendStatus(204); // Respond with a success status code (No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update ordered Drink' });
  }
});

//-----------------------------------------------------------------------------------//

app.post('/order', (req, res) => {
  const orderItems = req.body.orderItems;
  const tableNumber = req.body.tableNumber;
  // Check the availability of orderItems in your database or any other data source
  // Assume you have a function called checkAvailability() that returns a boolean value
  const isAvailable = checkDishAvailability(orderItems);

  if (isAvailable && tableNumber != null) {
   addOrder(tableNumber, orderItems);
    // Send a success response
    res.status(200).json({ message: 'Order placed successfully!' });
  } else {
    // Send an error response indicating the unavailable items
    res.status(400).json({ message: 'Some items are not available for order.' });
  }
});

//every get which should be handled differently needs to be declared above this !!

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


