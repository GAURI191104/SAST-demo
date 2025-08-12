const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

app.get("/user", (req, res) => {
    let userId = req.query.id;  
    // ❌ Vulnerable: Directly using user input in SQL query
    let query = "SELECT * FROM users WHERE id = " + userId;
    
    let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "testdb"
    });
    
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
