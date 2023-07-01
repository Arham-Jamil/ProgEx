-- CREATE TABLE IF NOT EXISTS Dishes(
-- ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- Name VARCHAR(64) NOT NULL,
-- Price DECIMAL(6,2) NOT NULL,
-- Description VARCHAR(255), 
-- Available INTEGER UNSINGED NOT NULL,
-- Quantity INTEGER NOT NULL,
-- ImagePath VARCHAR(128) );

-- CREATE TABLE IF NOT EXISTS CategoryDish(
-- ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- Name VARCHAR(64) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS Dish_Cat(
-- ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- Dishes_ID INTEGER NOT NULL,
-- CategoryDish_ID INTEGER NOT NULL,
-- FOREIGN KEY(Dishes_ID) REFERENCES Dishes(ID),
-- FOREIGN KEY (CategoryDish_ID) REFERENCES CategoryDish(ID)
-- );

-- CREATE TABLE IF NOT EXISTS Drinks(
-- ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- Name VARCHAR(64) NOT NULL,
-- Volume INTEGEGER UNSIGNED NOT NULL,
-- Price DECIMAL(6,2) NOT NULL,
-- Available INTEGER UNSINGED NOT NULL,
-- Description VARCHAR(255),
-- ImagePath VARCHAR(128)
-- );

-- CREATE TABLE IF NOT EXISTS CategoryDrinks(
-- ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- Name VARCHAR(64) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS Drinks_Cat(
-- ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- Drinks_ID INTEGER NOT NULL,
-- CategoryDrinks_ID INTEGER NOT NULL,
-- FOREIGN KEY(Drinks_ID) REFERENCES Dishes(ID),
-- FOREIGN KEY (CategoryDrinks_ID) REFERENCES CategoryDish(ID)
-- );

-- CREATE TABLE IF NOT EXISTS Ingredients(
-- ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- Name VARCHAR(64) NOT NULL,
-- Quantity INTEGER UNSINGED NOT NULL,
-- UnitOfMeasurement VARCHAR(64) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS Orders(
-- ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- TableNumber INTEGER UNSINGED NOT NULL,
-- Paid INTEGER UNSINGED NOT NULL,
-- Date DATETIME NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS OrderedDishes(
-- ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- Orders_ID INTEGER NOT NULL,
-- Dishes_ID INTEGER NOT NULL,
-- Status INTEGER NOT NULL,
-- Description VARCHAR(128),
-- AdditionalCharges DECIMAL(6,2) NOT NULL DEFAULT 0,
-- Refunded INTEGER UNSINGED NOT NULL,
-- FOREIGN KEY (Orders_ID) REFERENCES Orders(ID),
-- FOREIGN KEY (Dishes_ID) REFERENCES Dishes(ID)
-- );

-- CREATE TABLE IF NOT EXISTS OrderedDrinks(
-- ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- Orders_ID INTEGER NOT NULL,
-- Drinks_ID INTEGER NOT NULL,
-- Status INTEGER NOT NULL,
-- Description VARCHAR(128),
-- AdditionalCharges DECIMAL(6,2) NOT NULL DEFAULT 0,
-- Refunded INTEGER UNSINGED NOT NULL,
-- FOREIGN KEY (Orders_ID) REFERENCES Orders(ID),
-- FOREIGN KEY (Drinks_ID) REFERENCES Drinks(ID)
-- );

-- CREATE TABLE IF NOT EXISTS Extras(
-- ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- Name VARCHAR(64) NOT NULL,
-- Price DECIMAL(6,2) NOT NULL,
-- Available INTEGER UNSINGED NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS StaffAccount(
-- ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- Username VARCHAR(64) NOT NULL,
-- Password VARCHAR(512) NOT NULL,
-- Salt VARCHAR(255) NOT NULL,
-- Active INTEGER UNSINGED NOT NULL
-- );


-- --------------------------------------- Populate Tables -- ------------------------------------------


-- INSERT INTO Dishes (Name, Price, Description, Available, Quantity, ImagePath)
-- VALUES('Peanut Butter Sandwich',8.5,'THE LOOONG WAY',1, -1, 'https://i.ytimg.com/vi/5lJBfRSgE8E/maxresdefault.jpg'),
--     ('Chicken Sandwich',6.2,'You cant come back here',1,-1,'https://i.ytimg.com/vi/xRSIQruBmcI/hqdefault.jpg'),
--     ('Broccoli',2.5,'Take that, Liberals!',1,-1,'https://www.zindel-frucht.de/images/broccoli.jpg'),
--     ('Chicken Wings',5.5,'Busting!!',1,-1,'https://i.ytimg.com/vi/oA8XP5ktb2U/hqdefault.jpg'),
--     ('Donut',1.5,'You fat fuck',1,-1,'https://i.ytimg.com/vi/V8ctIUENUIA/hq720.jpg?sqp=-oaymwEcCK4FEIIDSEbyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAjzCwjLAxZP716B3bdVngmCEKzaA');

-- INSERT INTO Drinks (Name, Volume, Price, Available, Description, ImagePath)
-- VALUES('Water (small)',300,2.0, 1,'Looks like Water, tastes like Water, must be Water','https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fphotos%2Fimages%2Fnewsfeed%2F001%2F521%2F120%2F9d3.jpg'),
-- ('Water (large)',500,2.6, 1, 'More Water','https://i.imgflip.com/278aoi.jpg?a468384'),
-- ('Coca Cola (small)',300,2.6, 1,'Cola','https://i.ytimg.com/vi/s4bC7VkRCws/mqdefault.jpg'),
-- ('Coca Cola (large)',500,3.6, 1,'Just like Cola but more','https://efratadenny.files.wordpress.com/2012/11/big-coca-cola.jpg'),
-- ('Tea',300,2.2, 1,'Drink it or spill it','https://images-prod.dazeddigital.com/800/azure/dazed-prod/1170/8/1178438.jpg'),
-- ('Beer',500,4.5, 1,'Makes driving even more fun','https://images3.memedroid.com/images/UPLOADED912/5a89631644047.jpeg');

-- INSERT INTO CategoryDish (Name)
-- Values('Appetizer'),
-- ('Main Course'),
-- ('Dessert'),
-- ('Local Speciality'),
-- ('Veggie'),
-- ('Vegan'),
-- ('Gluten Free');

-- INSERT INTO CategoryDrinks (Name)
-- VALUES('Alcohol-free'),
-- ('Alcoholic'),
-- ('Hot'),
-- ('Cold');

-- INSERT INTO Extras (Name, Price, Available)
-- VALUES('Cheese',0.5,1),
-- ('Bacon',1.5,1),
-- ('Ketchup',0.5,1),
-- ('Mayo',0.5,1);

-- INSERT INTO Ingredients (Name, Quantity, UnitOfMeasurement)
-- VALUES('Potatoes',20000,'g'),
-- ('Peppers',1000,'g'),
-- ('Donut',100,'pc'); --pieces / stk

-- INSERT INTO StaffAccount (Username, Password, Salt, Active)
-- VALUES ('Admin','75170fc230cd88f32e475ff4087f81d9','f604b036bfa568441f0fd63c75fc0404',1);

-- INSERT INTO Dish_Cat (Dishes_ID, CategoryDish_ID)
-- VALUES(1,2), -- PeanutButterSandwich: MainCourse, Local Speciality, Veggie
-- (1,4),
-- (1,5),
-- (2,2), --ChickenSandwich: MainCourse
-- (3,1), --Broccoli: Appetizer,Main and Desser, Vegan, GlutenFree
-- (3,2),
-- (3,3),
-- (3,5),
-- (3,7),
-- (4,2), --ChickenWings: MainCourse
-- (5,3), --Donuts: Desser, Veggie
-- (5,5);

-- INSERT INTO Drinks_Cat (Drinks_ID, CategoryDrinks_ID)
-- VALUES(1,1), --Water small and large: alcoholic-free, Cold
-- (1,4),
-- (2,1),
-- (2,4),
-- (3,1), --Coke small and large: alcoholic-free, cold
-- (3,4),
-- (4,1),
-- (4,4),
-- (5,1), --Tea: Alc-free, hot
-- (5,3),
-- (6,2), --Beer: Alc, cold
-- (6,4);

-- INSERT INTO Orders (TableNumber, Paid, Date)
-- VALUES(12,0,Date('now'));

-- INSERT INTO OrderedDishes (Orders_ID,Dishes_ID,Status,Description,AdditionalCharges,Refunded)
-- VALUES(1,2,0,'More Cheese',0.5,0);

-- INSERT INTO OrderedDrinks (Orders_ID,Drinks_ID,Status,Description,AdditionalCharges,Refunded)
-- VALUES(1,2,0,NULL,0,0);




-- INSERT INTO Extras (Name, Price, Available)
-- VALUES('Salad',0.5,0);


-- INSERT INTO Ingredients (Name, Quantity, UnitOfMeasurement)
-- VALUES('Mango',0,'g');

-- INSERT INTO StaffAccount (Username, Password, Salt, Active)
-- VALUES ('TestAdmin','Passwort','Salz',1),
-- ('TestUser','75170fc230csadd88f32e475ff4087f81d9','f604b036bfa56das8441f0fd63c75fc0404',0);

SELECT * FROM OrderedDishes;
SELECT * FROM OrderedDrinks;
SELECT * FROM Orders;


SELECT * FROM Extras;
SELECT * FROM Ingredients;
SELECT * FROM StaffAccount;

SELECT * FROM Dishes;
SELECT * FROM CategoryDish;
SELECT * FROM Dish_Cat;

SELECT * FROM CategoryDrinks;
SELECT * FROM Drinks;
SELECT * FROM Drinks_Cat;



-- Join Drinks
SELECT Drinks.*, CategoryDrinks.name AS 'Category'
FROM Drinks
INNER JOIN Drinks_Cat ON Drinks.id = Drinks_Cat.drinks_id
INNER JOIN CategoryDrinks ON Drinks_Cat.categoryDrinks_id = CategoryDrinks.id;

--join dishes
SELECT Dishes.*, CategoryDish.name AS 'Category'
FROM Dishes
INNER JOIN Dish_Cat ON Dishes.id = Dish_Cat.dishes_id
INNER JOIN CategoryDish ON Dish_Cat.categoryDish_id = Categorydish.id;

--join Orders



SELECT * FROM OrderedDishes;
SELECT * FROM OrderedDrinks;
SELECT * FROM Orders;


SELECT Orders.ID, Orders.TableNumber, Orders.Paid, Orders.Date, OrderedDishes.*, OrderedDrinks.*
FROM Orders
LEFT JOIN OrderedDishes ON Orders.ID = OrderedDishes.Orders_ID
LEFT JOIN OrderedDrinks ON Orders.ID = OrderedDrinks.Orders_ID;

INSERT INTO ingredients