var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "5Noneya))^&M",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;  
  viewProducts();
});

//Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
function viewProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("id: " + res[i].id + "--[" + "Product Name: " + res[i].product_name + "]---------[" + "Department Name: " + 
            res[i].department_name + "]---------[" + "Price: " + res[i].price + "]---------[" + "Stock Quantity: " + res[i].stock_quantity + "]");
        }
        console.log('\n');
        itemSelection();
    });
}

//The app should then prompt users with two messages.
function itemSelection() {
    inquirer
        .prompt([
            {
                //The first should ask them the ID of the product they would like to buy.    
                type: "input",
                name: "item",
                message: "Please enter the ID of the product",
                choices: ['11','12','13','14','15','16','17','18','19','20']
            },
            {
                type: "input",
                name: "unit",
                message: "Enter how many units you want"
            }
        ])
        .then(function(answer) {
            //Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
    //If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
    //However, if your store does have enough of the product, you should fulfill the customer's order.
    // This means updating the SQL database to reflect the remaining quantity.
    // Once the update goes through, show the customer the total cost of their purchase.

    // function item11() {
        var query = "SELECT * FROM products WHERE id =" + answer.item; //query table products, stock_quantity
        var updatedQuantity;
        connection.query(query, function(err, res) {
            if (answer.unit <= res[0].stock_quantity) {
                updatedQuantity = res[0].stock_quantity - answer.unit;
                console.log("Your cost is: " + (answer.unit * res[0].price));
                updateStock();
            }
            else {
                return console.log("Insufficient quantity!");
            }        
        });
        //Updates stock quantity
            function updateStock() {
                var query = "UPDATE products SET stock_quantity = " + updatedQuantity + "WHERE id =" + answer.item;
                connection.query(query, function(err, res) {
                    console.log("Stock Quantity is now: " + updatedQuantity);
                    console.log("\n");
                    itemSelection();
                });
                
            }    
        });
    }        
    
// If this activity took you between 8-10 hours, then you've put enough time into this assignment. Feel free to stop here -- unless you want to take on the next challenge.