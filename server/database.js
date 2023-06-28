// server/database.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database
const dbFilePath = path.join(__dirname, "./database/RestaurantDB.db");
const db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

//test

//db.serialize(() => {
//
// // Create Dishes table
// db.run(`
// CREATE TABLE IF NOT EXISTS Dishes (
//   ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   Name TEXT NOT NULL,
//   Price REAL NOT NULL,
//   Description TEXT,
//   Available INTEGER NOT NULL,
//   Quantity INTEGER NOT NULL,
//   ImagePath TEXT
// )
//`);
//
//// Create CategoryDish table
//db.run(`
// CREATE TABLE IF NOT EXISTS CategoryDish (
//   ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   Name TEXT NOT NULL
// )
//`);
//
//// Create Dish_Cat table
//db.run(`
// CREATE TABLE IF NOT EXISTS Dish_Cat (
//   ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   Dishes_ID INTEGER NOT NULL,
//   Category_ID INTEGER NOT NULL,
//   FOREIGN KEY (Dishes_ID) REFERENCES Dishes(ID),
//   FOREIGN KEY (Category_ID) REFERENCES CategoryDish(ID)
// )
//`);
//
//// Create Drinks table
//db.run(`
// CREATE TABLE IF NOT EXISTS Drinks (
//   ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   Name TEXT NOT NULL,
//   Volume INTEGER NOT NULL,
//   Price REAL NOT NULL,
//   Description TEXT,
//   ImagePath TEXT
// )
//`);
//
//// Create CategoryDrinks table
//db.run(`
// CREATE TABLE IF NOT EXISTS CategoryDrinks (
//   ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   Name TEXT NOT NULL
// )
//`);
//
//// Create Drinks_Cat table
//db.run(`
// CREATE TABLE IF NOT EXISTS Drinks_Cat (
//   ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   Drinks_ID INTEGER NOT NULL,
//   Category_ID INTEGER NOT NULL,
//   FOREIGN KEY (Drinks_ID) REFERENCES Drinks(ID),
//   FOREIGN KEY (Category_ID) REFERENCES CategoryDrinks(ID)
// )
//`);
//
//// Create Ingredients table
//db.run(`
// CREATE TABLE IF NOT EXISTS Ingredients (
//   ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   Name TEXT NOT NULL,
//   Quantity INTEGER NOT NULL,
//   UnitOfMeasurement TEXT NOT NULL
// )
//`);
//
//// Create Order table
//db.run(`
// CREATE TABLE IF NOT EXISTS Orders (
//   ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   TableNumber INTEGER NOT NULL,
//   Paid INTEGER NOT NULL,
//   Date TEXT
// )
//`);
//
//// Create OrderedDishes table
//db.run(`
// CREATE TABLE IF NOT EXISTS OrderedDishes (
//   ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   Order_ID INTEGER NOT NULL,
//   Dishes_ID INTEGER NOT NULL,
//   Status INTEGER NOT NULL,
//   Description TEXT,
//   AdditionalCharges REAL,
//   Refunded INTEGER NOT NULL,
//   FOREIGN KEY (Order_ID) REFERENCES Orders(ID),
//   FOREIGN KEY (Dishes_ID) REFERENCES Dishes(ID)
// )
//`);
//
//// Create OrderedDrinks table
//db.run(`
// CREATE TABLE IF NOT EXISTS OrderedDrinks (
//   ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   Order_ID INTEGER NOT NULL,
//   Drinks_ID INTEGER NOT NULL,
//   Status INTEGER NOT NULL,
//   Description TEXT,
//   AdditionalCharges REAL,
//   Refunded INTEGER NOT NULL,
//   FOREIGN KEY (Order_ID) REFERENCES Orders(ID),
//   FOREIGN KEY (Drinks_ID) REFERENCES Drinks(ID)
// )
//`);
//
//// Create Extras table
//db.run(`
// CREATE TABLE IF NOT EXISTS Extras (
//   ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   Name TEXT NOT NULL,
//   Price REAL NOT NULL,
//   Available INTEGER NOT NULL
// )
//`);
//
//// Create StaffAccount table
//db.run(`
// CREATE TABLE IF NOT EXISTS StaffAccount (
//   ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   Username TEXT NOT NULL,
//   Password TEXT NOT NULL,
//   Salt TEXT NOT NULL,
//   Active INTEGER NOT NULL
// )
//`);
//});

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

// Get all dishes
function getAllDishes() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM dishes', (err, dishes) => {
      if (err) {
        console.error(err.message);
      } else {
        resolve(dishes);
      }
    });
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

// Get all orders 
function getAllOrders() {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT orders.id, orders.tablenumber, orders.paid, orders.date FROM orders',
      (err, orders) => {
        if (err) {
            console.error(err.message);
        } else {
          resolve(orders);
        }
      }
    );
  });
}


//dennis testet Sachen
function getTableFromQuery(queryString) {
  return new Promise((resolve, reject) => {
    db.all(
      queryString,
      (err, tableReturn) => {
        if (err) {
          console.error(err.message);
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(tableReturn); // Resolve the promise with the retrieved ordered dishes
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

module.exports = { createDish, getAllDishes, createOrder, getAllOrders, closeDB, getTableFromQuery };