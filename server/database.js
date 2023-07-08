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
  drinksjoin: 'SELECT Drinks.*, CategoryDrinks.Name AS CategoryName FROM Drinks INNER JOIN CategoryDrinks ON Drinks.Category_ID = CategoryDrinks.id WHERE deleted = 0',
  dishesjoin: 'SELECT Dishes.*, CategoryDish.Name AS CategoryName FROM Dishes INNER JOIN CategoryDish ON Dishes.Category_ID = Categorydish.id WHERE deleted = 0'
};

// Connect to SQLite database
const dbFilePath = path.join(__dirname, "./database/RestaurantDB.db");
const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


// -------------------- CREATE functions --------------------------------
function createDish(name, price, description, available, quantity, imagePath, category_id) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO Dishes (Name, Price, Description, Available, Quantity, ImagePath, Category_ID) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, price, description, available, quantity, imagePath, category_id],
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

function createDrink(name, price, description, available, volume, imagePath, category_id) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO Drinks (Name, Price, Description, Available, Volume, ImagePath, Category_ID) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, price, description, available, volume, imagePath, category_id],
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

function createIngredient(name, quantity, unitOfMeasurement) {
  console.log('name: ', name);
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
  console.log('name: ', name);
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

function createCategoryDish(name) {
  console.log('name: ', name);
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO CategoryDish (name) VALUES (?)',
      [name],
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

function createCategoryDrink(name) {
  console.log('name: ', name);
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO CategoryDrinks (name) VALUES (?)',
      [name],
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

// -------------------- DELETE functions --------------------------------
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
//TEST TEST TEST
function setDishDeletedTrue(id) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE dishes SET deleted = 1 WHERE id = ?',
      [id],
      function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          console.log(`Dish with ID ${id} removed successfully`);
          resolve();
        }
      }
    );
  });
}
function setDrinkDeletedTrue(id) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE drinks SET deleted = 1 WHERE id = ?',
      [id],
      function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          console.log(`Drink with ID ${id} removed successfully`);
          resolve();
        }
      }
    );
  });
}

// -------------------- UPDATE functions --------------------------------
function updateIngredientQuantity(id, newQuantity) {
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

function updateExtraAvailable(id, newAvailable) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE extras SET available = ? WHERE id = ?',
      [newAvailable, id],
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


function updateCategoryDishName(id, newCategoryName) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE CategoryDish SET Name = ? WHERE id = ?',
      [newCategoryName, id],
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

function updateCategoryDrinksName(id, newCategoryName) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE CategoryDrinks SET Name = ? WHERE id = ?',
      [newCategoryName, id],
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


function updateDishOrderStatus(id, status) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE OrderedDishes SET status = ? WHERE id = ? ',
      [status, id],
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

function updateDrinkOrderStatus(id, status) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE OrderedDrinks SET status = ? WHERE id = ? ',
      [status, id],
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

function updateWholeDishesRow(id, name, price, categoryID, description, available, quantity, imagePath) {
  return new Promise((resolve, reject) => {
    console.log('db.run categoryID: ', categoryID);
    db.run(
      'UPDATE Dishes SET name = ?, price = ?, category_ID = ?, description = ?, available = ?, quantity = ?, imagePath = ? WHERE id = ?',
      [name, price, categoryID, description, available, quantity, imagePath, id],
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

function updateWholeDrinksRow(id, name, price, categoryID, description, available, volume, imagePath) {
  return new Promise((resolve, reject) => {
    console.log('db.run categoryID: ', categoryID);
    db.run(
      'UPDATE Drinks SET name = ?, price = ?, category_ID = ?, description = ?, available = ?, volume = ?, imagePath = ? WHERE id = ?',
      [name, price, categoryID, description, available, volume, imagePath, id],
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


//----------------------------------------------------------------------//

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
        } else if (hasUnrestrictedQuantity) {
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
          INSERT INTO Orders (TableNumber, Paid, Datetime)
          VALUES (?, 0, Datetime('now'))
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

//
function closeDB() {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}



module.exports = {
  queries,
  createDish,
  createDrink,
  createCategoryDrink,
  createCategoryDish,
  createExtra,
  createIngredient,

  updateCategoryDishName,
  updateCategoryDrinksName,
  updateIngredientQuantity,
  updateExtraAvailable,
  updateDishOrderStatus,
  updateDrinkOrderStatus,
  updateWholeDishesRow,
  updateWholeDrinksRow,

  deleteExtraById,
  deleteIngredientById,

  setDishDeletedTrue,
  setDrinkDeletedTrue,

  checkDishAvailability,
  addOrder,
  getTableFromQuery,
  closeDB
};
