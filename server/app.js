// server/app.js

const express = require('express');
const path = require('path');
const { getAllDishes, createDish, createOrder, getAllOrders, closeDB, getTableFromQuery } = require('./database');
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

// app.get('/dishes', async (req, res) => {
//   try {
//     const dishes = await getAllDishes();
//     res.json(dishes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch dishes' });
//   }
// });

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

// app.get('/orders', async (req, res) => {
//   try {
//     const orders = await getAllOrders();
//     res.json(orders);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// });


//dennis testet Sachen

// Global queries for SELECT * for each table
const queries = {
  ordereddishes: 'SELECT * FROM OrderedDishes',
  ordereddrinks: 'SELECT * FROM OrderedDrinks',
  categorydish: 'SELECT * FROM CategoryDish',
  categorydrinks: 'SELECT * FROM CategoryDrinks',
  extras: 'SELECT * FROM Extras',
  ingredients: 'SELECT * FROM Ingredients',
  staffaccount: 'SELECT * FROM StaffAccount',
  drinks: 'SELECT * FROM Drinks',
  dishes: 'SELECT * FROM Dishes',
  orders: 'SELECT * FROM Orders',
  drinksjoin: 'SELECT Drinks.*, CategoryDrinks.name AS Category FROM Drinks INNER JOIN Drinks_Cat ON Drinks.id = Drinks_Cat.drinks_id INNER JOIN CategoryDrinks ON Drinks_Cat.categoryDrinks_id = CategoryDrinks.id',
  dishesjoin: 'SELECT Dishes.*, CategoryDish.name AS Category FROM Dishes INNER JOIN Dish_Cat ON Dishes.id = Dish_Cat.dishes_id INNER JOIN CategoryDish ON Dish_Cat.categoryDish_id = Categorydish.id'
};


// Route handler. 
//every table as a path results in getting a SELECT * from said table
app.get(['/ordereddishes', '/ordereddrinks', '/categorydish', '/categorydrinks', '/extras', '/ingredients', '/staffaccount', '/drinks', '/dishes', '/orders', '/drinksjoin', '/dishesjoin'], async (req, res) => {
  const resource = req.path.slice(1).toLowerCase(); //cut the "/" so it matches the property names of the queries object
  try {

    const query = queries[resource]; //kann man später mit nem switch ersetzen wenn der Pfad nicht dem Table entsprechen soll (joins usw)

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


