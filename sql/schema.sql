DROP DATABASE bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(20,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);