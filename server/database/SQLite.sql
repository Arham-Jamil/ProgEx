-------------------------------- Drop Tables ----------------------------------
-- ---------------lösch einfach den Inhalt von RestaurantDB.db 

-------------------------------- Table Creation ----------------------------------

CREATE TABLE IF NOT EXISTS Dishes(
ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
Name VARCHAR(64) NOT NULL,
Price DECIMAL(6,2) NOT NULL,
Description VARCHAR(255) DEFAULT NULL, 
Available INTEGER UNSINGED NOT NULL DEFAULT 1,
Quantity INTEGER NOT NULL DEFAULT -1,
ImagePath VARCHAR(128) DEFAULT NULL,
Category_ID INTEGER UNSINGED NOT NULL,  --new
Deleted INTEGER UNSINGED NOT NULL DEFAULT 0,                -- new
FOREIGN KEY (Category_ID) REFERENCES CategoryDish(ID)   -- new
);

CREATE TABLE IF NOT EXISTS CategoryDish(
ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
Name VARCHAR(64) NOT NULL,
Deleted INTEGER NOT NULL DEFAULT 0
);

-- CREATE TABLE IF NOT EXISTS Dish_Cat(
-- ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- Dishes_ID INTEGER NOT NULL,
-- CategoryDish_ID INTEGER NOT NULL,
-- FOREIGN KEY(Dishes_ID) REFERENCES Dishes(ID),
-- FOREIGN KEY (CategoryDish_ID) REFERENCES CategoryDish(ID)
-- );

CREATE TABLE IF NOT EXISTS Drinks(
ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
Name VARCHAR(64) NOT NULL,
Volume INTEGEGER UNSIGNED NOT NULL,
Price DECIMAL(6,2) NOT NULL,
Available INTEGER UNSINGED NOT NULL DEFAULT 1,
Description VARCHAR(255) DEFAULT NULL,
ImagePath VARCHAR(128)DEFAULT NULL,
Category_ID INTEGER UNSINGED NOT NULL,    -- new
Deleted INTEGER UNSINGED NOT NULL DEFAULT 0,              -- new
FOREIGN KEY (Category_ID) REFERENCES CategoryDrinks(ID)   -- new
);

CREATE TABLE IF NOT EXISTS CategoryDrinks(
ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
Name VARCHAR(64) NOT NULL,
Deleted INTEGER NOT NULL DEFAULT 0
);

-- CREATE TABLE IF NOT EXISTS Drinks_Cat(
-- ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- Drinks_ID INTEGER NOT NULL,
-- CategoryDrinks_ID INTEGER NOT NULL,
-- FOREIGN KEY(Drinks_ID) REFERENCES Dishes(ID),
-- FOREIGN KEY (CategoryDrinks_ID) REFERENCES CategoryDish(ID)
-- );

CREATE TABLE IF NOT EXISTS Ingredients(
ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
Name VARCHAR(64) NOT NULL,
Quantity INTEGER UNSINGED NOT NULL,
UnitOfMeasurement VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS Orders(
ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
TableNumber INTEGER UNSINGED NOT NULL,
Paid INTEGER UNSINGED NOT NULL DEFAULT 0,
PaidPrice DECIMAL(6,2) NOT NULL DEFAULT 0, 
Datetime DATETIME NOT NULL DEFAULT (datetime('now')),
ServerCalled INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS OrderedDishes(
ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
Orders_ID INTEGER NOT NULL,
Dishes_ID INTEGER NOT NULL,
Status INTEGER NOT NULL DEFAULT 0,
Description VARCHAR(128)DEFAULT NULL,
AdditionalCharges DECIMAL(6,2) NOT NULL DEFAULT 0,
Refunded INTEGER UNSINGED NOT NULL DEFAULT 0,
FOREIGN KEY (Orders_ID) REFERENCES Orders(ID),
FOREIGN KEY (Dishes_ID) REFERENCES Dishes(ID)
);

CREATE TABLE IF NOT EXISTS OrderedDrinks(
ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
Orders_ID INTEGER NOT NULL,
Drinks_ID INTEGER NOT NULL,
Status INTEGER NOT NULL  DEFAULT 0,
Description VARCHAR(128) DEFAULT NULL,
AdditionalCharges DECIMAL(6,2) NOT NULL DEFAULT 0,
Refunded INTEGER UNSINGED NOT NULL  DEFAULT 0,
FOREIGN KEY (Orders_ID) REFERENCES Orders(ID),
FOREIGN KEY (Drinks_ID) REFERENCES Drinks(ID)
);

CREATE TABLE IF NOT EXISTS Extras(
ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
Name VARCHAR(64) NOT NULL,
Price DECIMAL(6,2) NOT NULL,
Available INTEGER UNSINGED NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS StaffAccount(
ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
Username VARCHAR(64) NOT NULL,
Password VARCHAR(512) NOT NULL,
Active INTEGER UNSINGED NOT NULL
);


-- --------------------------------------- Populate Tables -- ------------------------------------------


INSERT INTO Dishes (Name, Price, Description, Available, Quantity, ImagePath, Category_ID)
VALUES
  ('Mozzarella Sticks', 8.99, 'Crispy and cheesy fried mozzarella sticks.', 1, -1, 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 1),
  ('Chicken Wings', 10.99, 'Spicy and flavorful chicken wings served with a dipping sauce.', 1, -1, 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1153&q=80', 1),
  ('Grilled Steak', 16.99, 'Juicy and tender grilled steak seasoned to perfection.', 1, -1, 'https://images.unsplash.com/photo-1611171711791-b34fa42e9fc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 2),
  ('Spaghetti Bolognese', 12.99, 'Classic Italian dish with rich tomato sauce and ground meat served over spaghetti.', 1, -1, 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 2),
  ('Vegan Curry', 14.99, 'Aromatic and spicy vegan curry packed with vegetables and tofu.', 1, -1, 'https://www.noracooks.com/wp-content/uploads/2022/08/vegan-curry-6-1024x1536.jpg', 3),
  ('Quinoa Salad', 9.99, 'Healthy and refreshing salad with quinoa, mixed greens, and a tangy dressing.', 1, -1, 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80', 3),
  ('Chocolate Brownie', 6.99, 'Decadent and fudgy chocolate brownie topped with vanilla ice cream.', 1, -1, 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 4),
  ('Cheesecake', 8.99, 'Creamy and smooth cheesecake with a graham cracker crust.', 1, -1, 'https://images.getrecipekit.com/20211027143156-cheesecake-with-graham-cracker-crust-sq.jpg?aspect_ratio=16:9&quality=90&', 4),
  ('Vegan Chocolate Pudding', 7.99, 'Rich and velvety vegan chocolate pudding made with plant-based ingredients.', 1, -1, 'https://delightfuladventures.com/wp-content/uploads/2022/07/chocolate-pudding-with-almond-milk.jpg', 5),
  ('Fruit Salad', 6.99, 'Fresh and colorful assortment of seasonal fruits.', 1, -1, 'https://herbsandflour.com/wp-content/uploads/2019/11/Summer-Fruit-Salad.jpg', 5),
  ('Chicken Nuggets', 5.99, 'Crispy and golden chicken nuggets served with a side of fries.', 1, -1, 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80', 6),
  ('Macaroni and Cheese', 7.99, 'Classic comfort food dish with creamy macaroni and cheese.', 1, -1, 'https://plus.unsplash.com/premium_photo-1664478288635-b9703a502393?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80', 6),
  ('Classic Tiramisu', 5.99, 'A heavenly Italian dessert featuring layers of espresso-soaked ladyfingers and creamy mascarpone, dusted with cocoa powder for a perfectly balanced indulgence.', 1, 20, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGlyYW1pc3V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', 4);


INSERT INTO Drinks (Name, Volume, Price, Available, Description, ImagePath, Category_ID)
VALUES
  ('Cola', '500', 2.99, 1, 'Refreshing carbonated cola drink.', 'https://article.innovamarketinsights360.com/articleimgs/article_images/637322175136209307coca%20cola%20new2.jpg', 1),
  ('Orange Juice', '300', 3.99, 1, 'Freshly squeezed orange juice.', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 2),
  ('Iced Coffee', '400', 4.99, 1, 'Chilled coffee beverage with milk and sugar.', 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 3),
  ('Mojito', '250', 7.99, 1, 'Classic cocktail with rum, lime, mint, and soda water.', 'https://images.unsplash.com/photo-1632995561645-86a7777d3e7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 4),
  ('Water', '500', 1.99, 1, 'Pure and natural mineral water.', 'https://cdn.brita.net/.imaging/opt/mw1496/1635931233720/dam/jcr:8d98c900-95ef-4c90-a704-778073263a3e/brita_gastronomy_and_hotel_water_dispenser_for_restaurant_water_bottle_landscape.jpg', 5),
  ('Lemonade', '300', 3.99, 1, 'Refreshing and tangy lemonade drink.', 'https://images.unsplash.com/photo-1575596510825-f748919a2bf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 1),
  ('Apple Juice', '300', 3.99, 1, 'Sweet and flavorful apple juice.', 'https://images.unsplash.com/photo-1626120032630-b51c96a544f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80', 2),
  ('Iced Tea', '400', 4.99, 1, 'Chilled tea beverage with lemon and sweetener.', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80', 3),
  ('Margarita', '250', 7.99, 1, 'Classic tequila-based cocktail with lime and salt.', 'https://images.unsplash.com/photo-1544145945-b4744b209fc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 4),
  ('Sparkling Water', '500', 1.99, 1, 'Bubbly and effervescent sparkling water.', 'https://images.unsplash.com/photo-1626810333910-c4a297aff6ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80', 5),
  ('Peach Soda', '300', 3.99, 1, 'Fruity and fizzy peach-flavored soda.', 'https://plus.unsplash.com/premium_photo-1687977547722-3af7dfecb213?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 1),
  ('Grape Juice', '300', 3.99, 1, 'Rich and sweet grape juice.', 'https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=691&q=80', 2);


INSERT INTO CategoryDish (Name)
Values  ('Appetizer'),
        ('Main Course'),
        ('Main Course - Vegan'),
        ('Dessert'),
        ('Dessert - Vegan'),
        ('For kids');

INSERT INTO CategoryDrinks (Name)
VALUES  ('Carbonated Drinks'),
        ('Fruit Juices'),
        ('Coffee & Tea'),
        ('Alcoholic Beverages'),
        ('Other');

INSERT INTO Extras (Name, Price, Available)
VALUES
  ('Cheese', 0.5, 1),
  ('Bacon', 1.5, 1),
  ('Ketchup', 0.5, 1),
  ('Mayo', 0.5, 1),
  ('Lettuce', 0.25, 1),
  ('Tomato', 0.25, 1),
  ('Onion', 0.25, 1),
  ('Pickles', 0.25, 1),
  ('Mustard', 0.5, 1),
  ('Sour Cream', 0.75, 1);

INSERT INTO Ingredients (Name, Quantity, UnitOfMeasurement)
VALUES
  ('Potatoes', 30, 'kg'),
  ('Peppers', 2, 'kg'),
  ('Flour', 15, 'kg'),
  ('Sugar', 5, 'kg'),
  ('Salt', 5, 'kg'),
  ('Olive Oil', 20, 'l'),
  ('Butter', 10, 'kg'),
  ('Eggs', 50, 'pcs'),
  ('Milk', 10, 'l');

INSERT INTO StaffAccount (Username, Password, Active)
VALUES ('admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',1),
        ('admin2','1c142b2d01aa34e9a36bde480645a57fd69e14155dacfab5a3f9257b77fdc8d8',0);


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
-- (5,5),
-- (6,2), --Test Dish 1: MainCourse
-- (7,2); --Test Dish 2: MainCourse


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
-- (6,4),
-- (7,4); --TestDrink: cold

INSERT INTO Orders (TableNumber, Datetime)
VALUES(1, Datetime('now')),
(4, Datetime('now'));

INSERT INTO OrderedDishes (Orders_ID,Dishes_ID,Description)
VALUES (1,2, 'Please not that spicy'),
(1,10, NULL),
(2,3, 'Mediun-rare pls'),
(2,7, 'can you add extra ice-cream?');

INSERT INTO OrderedDrinks (Orders_ID,Drinks_ID,Description)
VALUES (1,1,'no ice'),
(1,2,NULL),
(2,7,NULL),
(2,3,'no sugar pls');


SELECT * FROM OrderedDishes;
SELECT * FROM OrderedDrinks;
SELECT * FROM Orders;

SELECT * FROM Extras;
SELECT * FROM Ingredients;
SELECT * FROM StaffAccount;

SELECT * FROM Dishes;
SELECT * FROM CategoryDish;

SELECT * FROM CategoryDrinks;
SELECT * FROM Drinks;

-- SELECT SUM( Dishes.Price) AS DishPrice
--       FROM Dishes
--       JOIN OrderedDishes ON Dishes.ID = OrderedDishes.Dishes_ID
--       JOIN Orders ON OrderedDishes.Orders_ID = Orders.ID

-- SELECT SUM( Drinks.Price) AS DrinkPrice
--       FROM Drinks
--       JOIN OrderedDrinks ON Drinks.ID = OrderedDrinks.Drinks_ID
--       JOIN Orders ON OrderedDrinks.Orders_ID = Orders.ID
    

-- -- Join Drinks
-- SELECT Drinks.*, CategoryDrinks.name AS 'Category'
-- FROM Drinks
-- INNER JOIN Drinks_Cat ON Drinks.id = Drinks_Cat.drinks_id
-- INNER JOIN CategoryDrinks ON Drinks_Cat.categoryDrinks_id = CategoryDrinks.id;

--join dishes
-- SELECT Dishes.*, CategoryDish.Name AS CategoryName FROM Dishes INNER JOIN CategoryDish ON Dishes.Category_ID = Categorydish.id WHERE deleted = 0 

--join drinks

-- SELECT Drinks.*, CategoryDrinks.Name AS CategoryName FROM Drinks INNER JOIN CategoryDrinks ON Drinks.Category_ID = CategoryDrinks.id WHERE deleted = 0 


-- UPDATE Dishes SET deleted = 0 WHERE ID = 7

-- SELECT Drinks.*, CategoryDrinks.Name AS CategoryName FROM Drinks INNER JOIN CategoryDrinks ON Drinks.Category_ID = CategoryDrinks.id WHERE deleted = 0 
-- SELECT Dishes.*, CategoryDish.Name AS CategoryName FROM Dishes INNER JOIN CategoryDish ON Dishes.Category_ID = Categorydish.id WHERE deleted = 0 AND AVAILABLE = 1


