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

// Kann man create zusammenfassen??
function createIngredient(name, quantity, unitOfMeasurement) {
  console.log('name: ' , name);
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO ingredients (name, quantity, unitOfMeasurement) VALUES (?, ?, ?)',
      [name, quantity, unitOfMeasurement],
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
function createExtra(name, price, available) {
  console.log('name: ' , name);
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO extras (name, price, available) VALUES (?, ?, ?)',
      [name, price, available],
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

//kann man die deleteByID zusammenfassen??
function deleteExtraById(id) {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM extras WHERE id = ?',
      [id],
      function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          console.log(`Extra with ID ${id} deleted successfully`);
          resolve();
        }
      }
    );
  });
}
function deleteIngredientById(id) {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM ingredients WHERE id = ?',
      [id],
      function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          console.log(`Ingredient with ID ${id} deleted successfully`);
          resolve();
        }
      }
    );
  });
}

// Function to check the availability and quantity of order items
function checkDishAvailability(orderItems) {

  return new Promise((resolve, reject) => {
    // Create a map to store the available quantities of each ordered item
    const availableQuantities = new Map();

    // Iterate through each order item
    orderItems.forEach((item, index) => {
      // Prepare the SQL query to check the availability and quantity
      const sql = `
        SELECT Available, Quantity
        FROM Dishes
        WHERE ID = ?
      `;

      // Execute the query with the order item as a parameter
      db.get(sql, item.id, (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        // Check if the item is available and the quantity is sufficient
        const isAvailable = row.Available === 1;
        const hasEnoughQuantity = row.Quantity >= item.amount;
        const hasUnrestrictedQuantity = row.Quantity < 0;

        if (!isAvailable || (!hasEnoughQuantity && !hasUnrestrictedQuantity)) {
          // Set the available quantity of the item to 0
          availableQuantities.set(item, 0);
        } else if(hasUnrestrictedQuantity) {
          // Set the available quantity of the item to the requested quantity if quantity is not restriced
          availableQuantities.set(item, item.amount);
        } else {
          // Set the available quantity of the item to the retrieved quantity
          availableQuantities.set(item, row.quantity);
        }
      });
    });

    // Check if all items have sufficient quantity
    const allAvailable = [...availableQuantities.values()].every(quantity => quantity >= 1);
    resolve(allAvailable);
  });
};

// Function to add to an existing order or create a new one
function addOrder(tableNumber, orderItems) {

  return new Promise((resolve, reject) => {
    // Check if an unpaid order with the same table number exists
    const checkExistingOrder = () => {
      return new Promise((resolve, reject) => {
        // Prepare the SQL query to find the existing order
        const sql = `
          SELECT ID
          FROM Orders
          WHERE TableNumber = ?
            AND Paid = 0
        `;

        // Execute the query with the table number as a parameter
        db.get(sql, tableNumber, (err, row) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          if (row) {
            // An existing unpaid order found
            resolve(row.ID);
          } else {
            // No existing unpaid order found
            resolve(null);
          }
        });
      });
    };

    // Function to insert a new order into the database
    const insertNewOrder = () => {
      return new Promise((resolve, reject) => {
        // Prepare the SQL query to insert a new order
        const sql = `
          INSERT INTO Orders (TableNumber, Paid, Date)
          VALUES (?, 0, Date('now'))
        `;

        // Execute the query with the table number as a parameter
        db.run(sql, tableNumber, function (err) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          // Get the newly inserted order ID
          const orderId = this.lastID;
          resolve(orderId);
        });
      });
    };

    // Function to add ordered items to an order
    const addItemsToOrder = (orderId) => {
      return new Promise((resolve, reject) => {
        // Prepare the SQL query to insert ordered items
        const sql = `
          INSERT INTO OrderedDishes (Orders_id, Dishes_id, Status, Refunded)
          VALUES (?, ?, 0, 0)
        `;
        // Insert each ordered item into the database
        orderItems.forEach((item, index) => {
          db.run(sql, orderId, item.id, function (err) {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }
          });
        });

        resolve();
      });
    };

    // Check if an existing unpaid order with the same table number exists
    checkExistingOrder()
      .then((existingOrderId) => {
        if (existingOrderId != null) {
          // Add the ordered items to the existing order
          return addItemsToOrder(existingOrderId);
        } else {
          // Insert a new order into the database
          return insertNewOrder()
            .then((newOrderId) => {
              // Add the ordered items to the new order
              return addItemsToOrder(newOrderId);
            });
        }
      })
      .then(() => {
        // Resolve the promise
        resolve();
      })
      .catch((err) => {
        // Reject the promise with the error
        reject(err);
      });
  });
};


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

function updateIngredientQuantity(id, newQuantity){
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE ingredients SET quantity = ? WHERE id = ?',
      [newQuantity, id],
      function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};



//
function closeDB() {
    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });
  }



module.exports = { createDish,deleteExtraById, createExtra,updateIngredientQuantity, closeDB, getTableFromQuery, queries ,createIngredient, deleteIngredientById, checkDishAvailability, addOrder};