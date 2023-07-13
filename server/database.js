// server/database.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Global queries 
const queries = {
  ordereddishes: 'SELECT * FROM OrderedDishes',
  ordereddrinks: 'SELECT * FROM OrderedDrinks',
  categorydish: 'SELECT * FROM CategoryDish WHERE deleted = 0',
  categorydrinks: 'SELECT * FROM CategoryDrinks WHERE deleted = 0',
  extras: 'SELECT * FROM Extras',
  extrasavailable: 'SELECT * FROM Extras WHERE available = 1',
  ingredients: 'SELECT * FROM Ingredients',
  staffaccount: 'SELECT * FROM StaffAccount',
  drinks: 'SELECT * FROM Drinks',
  dishes: 'SELECT * FROM Dishes',
  orders: 'SELECT * FROM Orders',
  drinksjoin: 'SELECT Drinks.*, CategoryDrinks.Name AS CategoryName FROM Drinks INNER JOIN CategoryDrinks ON Drinks.Category_ID = CategoryDrinks.id WHERE Drinks.deleted = 0',
  dishesjoin: 'SELECT Dishes.*, CategoryDish.Name AS CategoryName FROM Dishes INNER JOIN CategoryDish ON Dishes.Category_ID = Categorydish.id WHERE Dishes.deleted = 0',
  ordereddishesjoin: `SELECT OrderedDishes.*, Dishes.Name, Orders.TableNumber 
  FROM OrderedDishes 
  LEFT JOIN Dishes ON OrderedDishes.Dishes_ID = Dishes.ID
  LEFT JOIN Orders ON OrderedDishes.Orders_ID = Orders.ID`,
  ordereddrinksjoin: `SELECT OrderedDrinks.*, Drinks.Name, Orders.TableNumber 
  FROM OrderedDrinks 
  LEFT JOIN Drinks ON OrderedDrinks.Drinks_ID = Drinks.ID
  LEFT JOIN Orders ON OrderedDrinks.Orders_ID = Orders.ID`,
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
      'UPDATE dishes SET deleted = 1, available = 0 WHERE id = ?',
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
      'UPDATE drinks SET deleted = 1, available = 0 WHERE id = ?',
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


function setDishCategoryDeletedTrue(id) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE categorydish SET deleted = 1 WHERE id = ?',
      [id],
      function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          console.log(`Dishcategory with ID ${id} removed successfully`);
          resolve();
        }
      }
    );
  });
}
function setDrinkCategoryDeletedTrue(id) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE categorydrinks SET deleted = 1 WHERE id = ?',
      [id],
      function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          console.log(`Drinkcategory with ID ${id} removed successfully`);
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


function updateDishOrder(orderedDish) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE OrderedDishes SET Status = ?, AdditionalCharges = ?, Refunded = ? WHERE id = ? ',
      [orderedDish.Status, orderedDish.AdditionalCharges, orderedDish.Refunded, orderedDish.ID],
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

function updateDrinkOrder(orderedDrink) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE OrderedDrinks SET Status = ?, AdditionalCharges = ?, Refunded = ? WHERE id = ? ',
      [orderedDrink.Status, orderedDrink.AdditionalCharges, orderedDrink.Refunded, orderedDrink.ID],
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

async function updateOrder(order) {
  try {
    const getOrderPaidStatusSql = `SELECT Paid FROM Orders WHERE ID = ?`;

    // Get the current status of the order
    const { Paid: currentStatus } = await new Promise((resolve, reject) => {
      db.get(getOrderPaidStatusSql, [order.ID], (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(row);
      });
    });

    // Check if the order has already been paid
    if (currentStatus === 1) {
      const errorMessage = 'Order has already been paid and cannot be edited.';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Update the order
    await new Promise((resolve, reject) => {
      const updateOrderSql = `UPDATE Orders SET Paid = ?, ServerCalled = ? WHERE ID = ?`;

      db.run(updateOrderSql, [order.Paid, order.ServerCalled, order.ID], function (err) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve();
      });
    });

    if (order.Paid) {
      const getOrderDishTotal = () => {
        return new Promise((resolve, reject) => {
          const getOrderDishSql = `
            SELECT 
              OrderedDishes.AdditionalCharges,
              Dishes.Price
            FROM 
              OrderedDishes 
              LEFT JOIN Dishes ON OrderedDishes.Dishes_ID = Dishes.ID
            WHERE 
              OrderedDishes.Orders_ID = ? AND
              OrderedDishes.Refunded = 0
          `;

          db.all(getOrderDishSql, [order.ID], (err, rows) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }

            const dishTotal = rows.reduce((total, row) => {
              const itemPrice = row.Price || 0;
              const itemTotal = itemPrice + row.AdditionalCharges;
              return total + itemTotal;
            }, 0);

            console.log('dish total:', dishTotal);
            resolve(dishTotal);
          });
        });
      };

      const getOrderDrinkTotal = () => {
        return new Promise((resolve, reject) => {
          const getOrderDrinkSql = `
            SELECT 
              OrderedDrinks.AdditionalCharges,
              Drinks.Price
            FROM 
              OrderedDrinks 
              LEFT JOIN Drinks ON OrderedDrinks.Drinks_ID = Drinks.ID
            WHERE 
              OrderedDrinks.Orders_ID = ? AND
              OrderedDrinks.Refunded = 0
          `;

          db.all(getOrderDrinkSql, [order.ID], (err, rows) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }

            const drinkTotal = rows.reduce((total, row) => {
              const itemPrice = row.Price || 0;
              const itemTotal = itemPrice + row.AdditionalCharges;
              return total + itemTotal;
            }, 0);

            console.log('drink total:', drinkTotal);
            resolve(drinkTotal);
          });
        });
      };

      const dishTotal = await getOrderDishTotal();
      const drinkTotal = await getOrderDrinkTotal();

      console.log('dish total:', dishTotal);
      console.log('drink total:', drinkTotal);

      const paidPrice = dishTotal + drinkTotal;

      // Update the order with the calculated total price
      await new Promise((resolve, reject) => {
        const updatePaidPriceSql = `UPDATE Orders SET PaidPrice = ? WHERE ID = ?`;
        db.run(updatePaidPriceSql, [paidPrice, order.ID], (err) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve();
        });
      });
    }
  } catch (err) {
    console.error('Failed to update order:', err);
    throw err;
  }
}


// function orderCallServer(tableNumber) {
//   return new Promise((resolve, reject) => {
//     console.log('table NUmber: ', tableNumber);
//     db.run(
//       'UPDATE Orders SET ServerCalled = 1 WHERE tablenumber = ? AND paid = 0',
//       [tableNumber],
//       function (err) {
//         if (err) {
//           console.error(err.message);
//           reject(err);
//         } else {
//           resolve();
//         }
//       }
//     );
//   });
// };


//new
function orderCallServer(tableNumber) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT OR IGNORE INTO Orders (tablenumber, ServerCalled) SELECT ?, 1 WHERE NOT EXISTS (SELECT 1 FROM Orders WHERE tablenumber = ? AND paid = 0)',
      [tableNumber, tableNumber],
      function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          if (this.changes === 0) {
            // Entry already exists, update the existing row with paid = 0
            db.run(
              'UPDATE Orders SET ServerCalled = 1 WHERE tablenumber = ? AND paid = 0',
              [tableNumber],
              function (err) {
                if (err) {
                  console.error(err.message);
                  reject(err);
                } else {
                  resolve();
                }
              }
            );
          } else {
            // New row inserted, resolve without updating
            resolve();
          }
        }
      }
    );
  });
}




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

// Function to check the availability and quantity of order dishes
function checkDishAvailability(orderItems) {

  // Extract the dish IDs from the dish objects
  const dishIds = orderItems.map((item) => item.id);
  //console.log('dishIds' , dishIds);
  return new Promise((resolve, reject) => {
    const placeholders = dishIds.map(() => '?').join(', ');
    db.all(
      `SELECT Dishes.ID, Dishes.Quantity, Dishes.Available
      FROM Dishes
      WHERE Dishes.ID IN (${placeholders})`,
      dishIds,
     (err, rows) => {
       if (err) {
         console.error(err);
         reject(err);
       } else {
         const dishAvailability = rows.map((row) => ({
          ID: row.ID,
          availableCount: row.Quantity,
          available: row.Available,
          infinite: row.Quantity === -1,
         }));

         

         dishAvailability.forEach((availability)=> {
            dishIds.forEach((id)=> {
              //console.log('for id', id);
              //console.log('id true', id === availability.ID);
              if(id === availability.ID && !availability.infinite){availability.availableCount -= 1;}})
            console.log('1 avail', availability);
         });

         //console.log('rows', rows);
         //console.log('dishaval', dishAvailability)

         const allDishesAvailable = dishAvailability.every(
           (dish) => (dish.availableCount >= 0 || dish.infinite) && dish.available != 0
         );

         console.log('is avail', allDishesAvailable);

         resolve(allDishesAvailable)
       }
     }
   );
 });
};

function checkDrinkAvailability(orderItems) {

  // Extract the dish IDs from the drink objects
  const drinkIds = orderItems.map((item) => item.id);

  return new Promise((resolve, reject) => {
    const placeholders = drinkIds.map(() => '?').join(', ');
    db.all(
      `SELECT Drinks.ID, Drinks.Available
      FROM Drinks
      WHERE Drinks.ID IN (${placeholders})`, drinkIds,
     (err, rows) => {
       if (err) {
         console.error(err);
         reject(err);
       } else {
         const drinkAvailability = rows.map((row) => ({
           ID: row.ID,
           available: row.Available,
         }));
         const allDrinksAvailable = drinkAvailability.every(
           (drink) => drink.available != 0
         );
         resolve(allDrinksAvailable)
       }
     }
   );
 });
};

// Function to add to an existing order or create a new one
function addOrder(tableNumber, orderDishes, orderDrinks) {

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

    const addDishesToOrder = (orderId) => {
      return new Promise((resolve, reject) => {
        orderDishes.forEach((dish, index) => {
          db.get(
            `SELECT Quantity FROM Dishes WHERE ID = ?`,
            [dish.id],
            (err, row) => {
              if (err) {
                console.error(err);
                reject(err);
                return;
              } else {
                if (row && row.Quantity != 0) {

                  if(row.Quantity > 0)
                  {
                    const newQuantity = row.Quantity - 1;
                    const newAvailable = newQuantity != 0;
                    db.run(`UPDATE Dishes SET quantity = ?,  available = ? WHERE ID = ?`, [newQuantity, newAvailable, dish.id], (err) => {
                      if (err) {
                        console.error(err);
                        reject(err);
                        return;
                      }
                    });
                  }
                  
                  const sql = `
                    INSERT INTO OrderedDishes (Orders_id, Dishes_id, Status, Description, Refunded)
                    VALUES (?, ?, 0, ?,0)
                    `;
                  
                  db.run(sql, orderId, dish.id, dish.description, function (err) {
                    if (err) {
                      console.error(err);
                      reject(err);
                      return;
                    }
                  });

                }
              }
            }
          );
        });

        resolve();
      })
    }

    const addDrinksToOrder = (orderId) => {
      return new Promise((resolve, reject) => {
        
        orderDrinks.forEach((drink, index) => {
          console.log(drink.id);
          const sql = `
            INSERT INTO OrderedDrinks (Orders_id, Drinks_id, Status, Description, Refunded)
            VALUES (?, ?, 0, ?, 0)
            `;
                  
            db.run(sql, orderId, drink.id, drink.description, function (err) {
              if (err) {
                console.error(err);
                reject(err);
                return;
                }
            });
        });
        resolve();
      })
    }

    // Check if an existing unpaid order with the same table number exists
    checkExistingOrder()
      .then((existingOrderId) => {
        if (existingOrderId != null) {
          // Add the ordered items to the new order
          successDish = addDishesToOrder(existingOrderId);
          successDrink = addDrinksToOrder(existingOrderId);
          return successDish && successDrink;
        } else {
          // Insert a new order into the database
          return insertNewOrder()
            .then((newOrderId) => {
              // Add the ordered items to the new order
              successDish = addDishesToOrder(newOrderId);
              successDrink = addDrinksToOrder(newOrderId);
              return successDish && successDrink;
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

//function to check password in the database
const checkCredentials = (username, password) =>{
  return new Promise((resolve, reject) =>{
    db.get(
      'SELECT * FROM StaffAccount WHERE Username = ? AND Password = ?',
      [username, password],
      (err, row) =>{
        console.log('row:',row)
        console.log('Username:',username)
        console.log('Password:',password)
        if(err){
          console.error(err);
          reject(err)
        }
        if(!row){
          console.log('credentials are not found in the StaffAccount Table')
          console.log('row:', row)
        }else{
          console.log('credentials in the table ')
        }
        if(row && row.Active == 1){
          console.log("Account is active")
          const isActive = row.Active;
          console.log('isActive:', isActive)
          resolve(isActive)
        }else{
          console.log('invalid credentials or account not active')
          resolve(false);
        }
      }
    )
  })
}

//to get the last ordered dishes
const getLastOrderedDishes = (tableNumber) =>{
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT Dishes.Name AS DishName, Dishes.Price AS DishPrice, OrderedDishes.Description AS OrderedDishDescription
      FROM Dishes
      JOIN OrderedDishes ON Dishes.ID = OrderedDishes.Dishes_ID 
      JOIN Orders ON OrderedDishes.Orders_ID = Orders.ID
      WHERE Orders.Paid = 0 AND Orders.TableNumber = ?`, [tableNumber],
      (err, rows) =>{
        if(err){
          console.error(err);
          reject(err);
        }
        if(rows){
          resolve(rows);
        }
      }
    )
  })
}

//to get the last ordered drinks
const getLastOrderedDrinks = (tableNumber) =>{
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT Drinks.Name AS DrinkName, Drinks.Price AS DrinkPrice
      FROM Drinks
      JOIN OrderedDrinks ON Drinks.ID = OrderedDrinks.Drinks_ID
      JOIN Orders ON OrderedDrinks.Orders_ID = Orders.ID 
      WHERE Orders.Paid = 0 AND Orders.TableNumber = ?`,[tableNumber],
      (err, row) =>{
        if(err){
          console.error(err);
          reject(err);
        }
        if(row){
          resolve(row);
        }
      }
    )
  })
}

//getting the total sum of last orders for dishes
const getTotalDishLastOrders = (tableNumber) =>{
  return new Promise((resolve, reject) =>{
    db.get(
      `SELECT SUM( Dishes.Price) AS DishPrice
      FROM Dishes
      JOIN OrderedDishes ON Dishes.ID = OrderedDishes.Dishes_ID
      JOIN Orders ON OrderedDishes.Orders_ID = Orders.ID
      WHERE Orders.TableNumber = ?`,[tableNumber],
      (err,row) =>{
        if(err){
          console.error(err);
          reject(err);
        }
        if(row){
          resolve(row);
        }
      }
    )
  })
}

//getting the total sum of last orders for drinks
const getTotalDrinkLastOrders = (tableNumber) =>{
  return new Promise((resolve, reject) =>{
    db.get(
      `SELECT SUM( Drinks.Price) AS DrinkPrice
      FROM Drinks
      JOIN OrderedDrinks ON Drinks.ID = OrderedDrinks.Drinks_ID
      JOIN Orders ON OrderedDrinks.Orders_ID = Orders.ID
      WHERE Orders.TableNumber = ?`,[tableNumber],
      (err,row) =>{
        if(err){
          console.error(err);
          reject(err);
        }
        if(row){
          // console.log('row drink:',row);
          resolve(row);
        }
      }
    )
  })
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
  updateDishOrder,
  updateDrinkOrder,
  updateOrder,
  updateWholeDishesRow,
  updateWholeDrinksRow,

  orderCallServer,

  deleteExtraById,
  deleteIngredientById,
  checkDrinkAvailability,
  

  setDishDeletedTrue,
  setDrinkDeletedTrue,
  setDishCategoryDeletedTrue,
  setDrinkCategoryDeletedTrue,

  checkDishAvailability,
  getTotalDishLastOrders,
  getTotalDrinkLastOrders,
  getLastOrderedDrinks,
  getLastOrderedDishes,
  checkCredentials,
  addOrder,
  getTableFromQuery,
  closeDB
};
