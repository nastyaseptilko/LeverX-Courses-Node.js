const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "final_homework",
    password: "password"
}).promise();

connection.connect(function(err) {
    if (err) {
        return console.error("Error: " + err.message);
    }
    else{
        console.log("Connection to MySQL server successfully established.");
    }
});

module.exports = {
    connectionPool: connection,
    sql: mysql
};
