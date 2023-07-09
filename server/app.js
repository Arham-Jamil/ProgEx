// server/app.js
const express = require('express');
const path = require('path');
// const {createDish,   updateIngredientQuantity,   createIngredient,   closeDB,   getTableFromQuery,   queries,   deleteIngredientById,   checkDishAvailability,   addOrder,   updateOrderStatus,  updateDishOrderStatus,  updateDrinkOrderStatus,  deleteExtraById,  createExtra,  updateExtraAvailable,  createCategoryDish,  createCategoryDrink,  updateCategoryDishName,  updateCategoryDrinksName} = require('./database');
const db = require('./database'); //access every function from database with db.functionName()

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
  const { Name: name, Quantity: quantity, UnitOfMeasurement: unitOfMeasurement } = req.body;
  console.log('name in post: ', name);
  try {
    const ingredientId = await db.createIngredient(name, quantity, unitOfMeasurement);
    res.status(201).json({ id: ingredientId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});
app.post('/extras', async (req, res) => {
  console.log('req.body: ', req.body);
  const { Name: name, Price: price, Available: available } = req.body;
  console.log('name in post: ', name);
  try {
    const extraId = await db.createExtra(name, price, available);
    res.status(201).json({ id: extraId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.post('/categorydish', async (req, res) => {
  console.log('req.body: ', req.body);
  const { Name: name } = req.body;
  console.log('name in post: ', name);
  try {
    const categoryDishId = await db.createCategoryDish(name);
    res.status(201).json({ id: categoryDishId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add category Dish' });
  }
});

app.post('/categorydrinks', async (req, res) => {
  console.log('req.body: ', req.body);
  const { Name: name } = req.body;
  console.log('name in post: ', name);
  try {
    const categoryDrinkId = await db.createCategoryDrink(name);
    res.status(201).json({ id: categoryDrinkId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add category Drink' });
  }
});


app.post('/dishes', async (req, res) => {
  console.log('req.body: ', req.body);
  const { Name: name,
    Price: price,
    Category_ID: category_id, 
    Description: description,
    Available: available,
    Quantity: quantity,
    ImagePath: imagePath } = req.body;
  console.log('name in post: ', name);
  try {
    const dishID = await db.createDish(name, price, description, available, quantity, imagePath, category_id);
    res.status(201).json({ id: dishID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create dish' });
  }
});

app.post('/drinks', async (req, res) => {
  console.log('req.body: ', req.body);
  const { Name: name,
    Price: price,
    Category_ID: category_id, 
    Description: description,
    Available: available,
    Volume: volume,
    ImagePath: imagePath } = req.body;
  console.log('name in post: ', name);
  try {
    const drinkID = await db.createDrink(name, price, description, available, volume, imagePath, category_id);
    res.status(201).json({ id: drinkID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create drink' });
  }
});


//------------- DELETE REQUESTS -----------------------------------------
//gets called by axios.delete(`http://localhost:3001/ingredients/${id}`) zb
app.delete('/extras/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.deleteExtraById(id);
    res.status(200).json({ message: `Extra with ID ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete extra' });
  }
});
app.delete('/ingredients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.deleteIngredientById(id);
    res.status(200).json({ message: `Ingredient with ID ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete ingredient' });
  }
});

app.delete('/dishes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.setDishDeletedTrue(id);
    res.status(200).json({ message: `Dish with ID ${id} removed from view successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove dish' });
  }
});

app.delete('/drinks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.setDrinkDeletedTrue(id);
    res.status(200).json({ message: `Drink with ID ${id} removed from view successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove drink' });
  }
});

//------------- Patch/Update REQUESTS --------------------------------
app.patch('/ingredients/:id', async (req, res) => {
  const { id } = req.params;
  const { Quantity } = req.body;
  try {
    await db.updateIngredientQuantity(id, Quantity);
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
    await db.updateExtraAvailable(id, Available);
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
    await db.updateCategoryDishName(id, Name);
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
    await db.updateCategoryDrinksName(id, Name);
    res.sendStatus(204); // Respond with a success status code (No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update drink category name' });
  }
});

app.patch('/dishes/:id', async (req, res) => {
  const { id } = req.params;
  const { Name: name,
    Price: price,
    Category_ID: categoryID,
    Description: description,
    Available: available,
    Quantity: quantity,
    ImagePath: imagePath } = req.body;
  console.log('app.patch() body: ', req.body);
  console.log('app.patch() categoryID: ', categoryID);

  try {
    await db.updateWholeDishesRow(id, name,price,categoryID,description,available,quantity,imagePath);
    res.sendStatus(204); // Respond with a success status code (No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update dish' });
  }
});

app.patch('/drinks/:id', async (req, res) => {
  const { id } = req.params;
  const { Name: name,
    Price: price,
    Category_ID: categoryID,
    Description: description,
    Available: available,
    Volume: volume,
    ImagePath: imagePath } = req.body;
  console.log('app.patch() body: ', req.body);
  console.log('app.patch() categoryID: ', categoryID);

  try {
    await db.updateWholeDrinksRow(id, name,price,categoryID,description,available,volume,imagePath);
    res.sendStatus(204); // Respond with a success status code (No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update drink' });
  }
});



// --------------------------------------------------------//
app.patch('/orderedDishes', async (req, res) => {
  const orderedDish = req.body.orderData;
  try {
    await db.updateDishOrder(orderedDish);
    res.sendStatus(204); // Respond with a success status code (No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update ordered Dish' });
  }
});

app.patch('/orderedDrinks', async (req, res) => {
  const orderedDrink = req.body.orderData;
  try {
    await db.updateDrinkOrder(orderedDrink);
    res.sendStatus(204); // Respond with a success status code (No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update ordered Drink' });
  }
});

app.patch('/orders', async (req, res) => {
  const order = req.body.orderData;
  try {
    await db.updateOrder(order);
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
  const isAvailable = db.checkDishAvailability(orderItems);

  if (isAvailable && tableNumber != null) {
    db.addOrder(tableNumber, orderItems);
    // Send a success response
    res.status(200).json({ message: 'Order placed successfully!' });
  } else {
    // Send an error response indicating the unavailable items
    res.status(400).json({ message: 'Some items are not available for order.' });
  }
});

// for the check credentials

app.post('/login', async (req, res)=>{
  const username = req.body.username;
  const password = req.body.password;
 console.log('req.body', req.body)

  try{
    const isActive = await db.checkCredentials(username,password)
    console.log('isActive', isActive)
    if(isActive){
      res.status(200).json({ success: true });
    }else{
      res.status(200).json({ success: false });
    }
  }catch(error){
    console.log(error);
    res.status(500).json({ success: false, error: 'internal server error' });
  } 
});

//every get which should be handled differently needs to be declared above this !!

//Route handler. every table as a path results in getting a SELECT * from said table
//  old: /ordereddishes', '/ordereddrinks', '/categorydish', '/categorydrinks', '/extras', '/ingredients', '/staffaccount', '/drinks', '/dishes', '/orders', '/drinksjoin', '/dishesjoin'
app.get(['/:resource'], async (req, res) => {
  const resource = req.params.resource.toLowerCase();
  //const resource = req.path.slice(1).toLowerCase();
  try {

    const query = db.queries[resource]; //vllt später mit switch ersetzen

    if (!query) {
      console.log("Query: " + query);
      console.log("Resource: " + resource);
      res.status(404).json({ error: 'Resource not found' });
      return;
    }
    const resourceData = await db.getTableFromQuery(query);
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


