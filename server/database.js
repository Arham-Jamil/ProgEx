// server/database.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Global queries 
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

// Connect to SQLite database
const dbFilePath = path.join(__dirname, "./database/RestaurantDB.db");
const db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

// Create a dish
function createDish(name, price, description, available, quantity, imagePath) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO dishes (name, price, description, available, quantity, imagePath) VALUES (?, ?, ?, ?, ?, ?)',
      [name, price, description, available, quantity, imagePath],
      function (err) {
        if (err) {
            console.error(err.message);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
}

// Create an order
function createOrder(tableNumber, paid, date) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO orders (tablenumber, paid, date) VALUES (?, ?, ?)',
      [tableNumber, paid, date],
      function (err) {
        if (err) {
            console.error(err.message);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
}

//function which gets a query and returns the output (table) of the given query
function getTableFromQuery(queryString) {
  return new Promise((resolve, reject) => {
    db.all(
      queryString,
      (err, tableReturn) => {
        if (err) {
          console.error(err.message);
          reject(err); 
        } else {
          resolve(tableReturn); 
        }
      }
    );
  });
}



//
function closeDB() {
    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });
  }



module.exports = { createDish, createOrder, closeDB, getTableFromQuery, queries };