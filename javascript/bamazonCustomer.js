//PACKAGES USED
var mysql = require("mysql");
var inquirer = require("inquirer");

//CONNECTING TO MYSQL
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  viewProducts();
});

//Displays Inventory
function viewProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        console.log("\n");

        console.log("ID" + " |        " + "PRODUCT NAME" + "       |       " + "DEPARTMENT NAME" + "      | " + "PRICE" + " | " + "STOCK QUANTITY");
        console.log("------------------------------------------------------------------------------------");
            console.log(res[0].id + " | " +  res[0].product_name + "              | " + res[0].department_name + "            | " + res[0].price + " |      " + res[0].stock_quantity);
            console.log(res[1].id + " | " +  res[1].product_name + "           | " + res[1].department_name + "            |   " + res[1].price + "   |      " + res[1].stock_quantity);
            console.log(res[2].id + " | " +  res[2].product_name + "     | " + res[2].department_name + "             |   " + res[2].price + "  |      " + res[2].stock_quantity);
            console.log(res[3].id + " | " +  res[3].product_name + "                     | " + res[3].department_name + "  | " + res[3].price + " |      " + res[3].stock_quantity);
            console.log(res[4].id + " | " +  res[4].product_name + "               | " + res[4].department_name + "                 | " + res[4].price + "  |      " + res[4].stock_quantity);
            console.log(res[5].id + " | " +  res[5].product_name + "     | " + res[5].department_name + "    | " + res[5].price + " |      " + res[5].stock_quantity);
            console.log(res[6].id + " | " +  res[6].product_name + " | " + res[6].department_name + "               | " + res[6].price + " |      " + res[6].stock_quantity);
            console.log(res[7].id + " | " +  res[7].product_name + "               | " + res[7].department_name + "          | " + res[7].price + "  |      " + res[7].stock_quantity);
            console.log(res[8].id + " | " +  res[8].product_name + " | " + res[8].department_name + "                      | " + res[8].price + "  |      " + res[8].stock_quantity);
            console.log(res[9].id + " | " +  res[9].product_name + "         | " + res[9].department_name + "                      | " + res[9].price + " |      " + res[9].stock_quantity);
        // }
        itemSelection();
    });
}
//Bamazon will first give you a choice to pick the ID of the product, then ask you to select the number of units for the product
function itemSelection() {
  inquirer
    .prompt([
      {
        //The first should ask them the ID of the product they would like to buy.
        type: "input",
        name: "item",
        message: "Please enter the ID of the product",
        choices: ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
      },
      {
        type: "input",
        name: "unit",
        message: "Enter how many units you want"
      }
    ])
    .then(function(answer) {
      var query = "SELECT * FROM products WHERE id =" + answer.item; //query table products, stock_quantity
      var updatedQuantity;
      connection.query(query, function(err, res) {
        if (answer.unit <= res[0].stock_quantity) {
          updatedQuantity = res[0].stock_quantity - answer.unit;
          console.log(
            "\n" + "\n" + "\n" + "\n" + "\n" + "\n" + "\n" + "\n" + "\n" + "\n"
          );
          console.log("-------------------------------------------");
          console.log(
            ">>>>>>>>>> YOUR BALANCE: $" +
              answer.unit * res[0].price +
              " <<<<<<<<<<<"
          );
          console.log("-------------------------------------------");
          var item = answer.item;
          updateStock(updatedQuantity, item);
        } else {
          return console.log("Insufficient quantity!");
        }
      });
      //Updates stock quantity
    });
}

function updateStock(updatedQuantity, item) {
  var query =
    "UPDATE products SET stock_quantity = " +
    "'" +
    updatedQuantity +
    "' " +
    "WHERE id =" +
    " '" +
    item +
    "'" +
    ";";
  connection.query(query, function(err, res) {
    console.log("What would else would you like to buy?");
    viewProducts();
  });
}
