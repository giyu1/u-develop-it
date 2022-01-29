// This variable is importing the express package 
const express = require('express');
// Connecting the mysql2 database 
const mysql = require('mysql2');
// Setting up the PORT and calling the express package 
const PORT = process.env.PORT || 3001;
const app = express();

// // Creating GET request 
// app.get('/', (req, res) => {
//     res.json({
//         message:'Hello World'
//     });
// });


// Express middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'Waffles12345',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

// This query method runs SQL query and executes a callback 
// w/ resulting rows that match the query 
// db.query(`Select * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if(err) {
//         console.log(err)
//     }
//     console.log(row);
// });

// Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(result);
// });

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
             VALUES(?,?,?,?)`
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, results) => {
    if (err) {
        console.log(err)
    }
    console.log(results);
});

// Default response for any other request (Not Found)
// This is a catch-all route b/c the "*" is considerd a 'wild card'
app.use("*", (req, res) => {
    res.status(404).end();
});

// In terminal it will log the PORT when the server is running 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});