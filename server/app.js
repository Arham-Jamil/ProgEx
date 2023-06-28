// server/app.js

const express = require('express');
const path = require('path');
const {createDish, createOrder, closeDB, getTableFromQuery, queries } = require('./database');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// API endpoints
app.post('/dishes', async (req, res) => {
  const { name, price, description, available, quantity, imagePath } = req.body;
  try {
    const dishId = await createDish(name, price, description, available, quantity, imagePath);
    res.status(201).json({ id: dishId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create dish' });
  }
});

//muss noch angepasst werden
app.post('/orders', async (req, res) => {
  const { dishesId, status, description, additionalCharges, refunded } = req.body;
  try {
    const orderId = await createOrder(dishesId, status, description, additionalCharges, refunded);
    res.status(201).json({ id: orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

/*implement here every other app.get() which is handled differently
*
*
*
*/

/*Route handler. every table as a path results in getting a SELECT * from said table
    old: /ordereddishes', '/ordereddrinks', '/categorydish', '/categorydrinks', '/extras', '/ingredients', '/staffaccount', '/drinks', '/dishes', '/orders', '/drinksjoin', '/dishesjoin'
*/
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


