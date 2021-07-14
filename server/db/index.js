const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'node_mini_sprint'
})

connection.connect();

module.exports = connection;