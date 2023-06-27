// server/app.js

const express = require('express');
const path = require('path');
const { getAllDishes, createDish, createOrder, getAllOrders, closeDB } = require('./database');
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

app.get('/dishes', async (req, res) => {
  try {
    const dishes = await getAllDishes();
    res.json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dishes' });
  }
});

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

app.get('/orders', async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../client/build')));

// Serve the React frontend for any remaining requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

module.exports = app;
