const mysql = require('mysql'),       
   inquirer = require('inquirer'), 
       key	= require('./key');
   
//CONNECTING TO MYSQL
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: key,
  database: 'bamazon_db'
});

connection.connect(function(err) {
  if (err) throw err;
  viewProducts();
});

//Displays Inventory
const viewProducts = () => {
    const queryProducts = 'SELECT * FROM products';
    connection.query(queryProducts, function(err, res) {        
        console.log(`ID  |        PRODUCT NAME       |       DEPARTMENT NAME      | PRICE | STOCK QUANTITY
-------------------------------------------------------------------------------------
${res[0].id}   |  ${res[0].product_name}             |       ${res[0].department_name}      | ${res[0].price} |      ${res[0].stock_quantity}
${res[1].id}   |  ${res[1].product_name}          |       ${res[1].department_name}      | ${res[1].price}     |      ${res[1].stock_quantity}
${res[2].id}   |  ${res[2].product_name}    |       ${res[2].department_name}       | ${res[2].price}    |      ${res[2].stock_quantity}
${res[3].id}   |  ${res[3].product_name}                    |  ${res[3].department_name} | ${res[3].price} |      ${res[3].stock_quantity}
${res[4].id}   |  ${res[4].product_name}              |           ${res[4].department_name}       | ${res[4].price}  |      ${res[4].stock_quantity}
${res[5].id}   |  ${res[5].product_name}    |    ${res[5].department_name} | ${res[5].price} |      ${res[5].stock_quantity}
${res[6].id}   |  ${res[6].product_name}|       ${res[6].department_name}         | ${res[6].price} |      ${res[6].stock_quantity}
${res[7].id}   |  ${res[7].product_name}              |       ${res[7].department_name}    | ${res[7].price}  |      ${res[7].stock_quantity}
${res[8].id}   |  ${res[8].product_name}|           ${res[8].department_name}            | ${res[8].price}  |      ${res[8].stock_quantity}
${res[9].id}  |  ${res[9].product_name}        |           ${res[9].department_name}            | ${res[9].price} |      ${res[9].stock_quantity}`);
          itemSelection();
    });
}
//Bamazon will first give you a choice to pick the ID of the product, then ask you to select the number of units for the product
const itemSelection = () =>{
  inquirer
    .prompt([
      {
        //The first should ask them the ID of the product they would like to buy.
        type: 'input',
        name: 'item',
        message: 'Please enter the ID of the product'        
      },
      {
        type: 'input',
        name: 'unit',
        message: 'Enter the quantity'
      }
    ])
    .then(function({item, unit}) {
      const query = 'SELECT * FROM products WHERE id =' + item;
      let updatedQuantity = 0;            
      connection.query(query, function(err, res) {
        balance = unit * res[0].price;
        if (unit <= res[0].stock_quantity) {
          updatedQuantity = res[0].stock_quantity - unit;
          console.log(`
          \n\n
--------------------------------------
>>>>>>>>> YOUR BALANCE: $${balance} <<<<<<<<<<            
-------------------------------------- \n\n\n\n`);
          updateStock(updatedQuantity, item);
        } else {
          return console.log("Insufficient quantity!");
        }
      });
    });
}

const updateStock = (updatedQuantity, item) => {
  const query = `UPDATE products SET stock_quantity = '${updatedQuantity}' WHERE id = '${item}';`;
  connection.query(query, function(err, res) {
    console.log("What would else would you like to buy?");
    viewProducts();
  });
}