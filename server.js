// This variable is importing the express package 
const express = require('express');
// Connecting the mysql2 database 
const mysql = require('mysql2');
// This function is requiring the use of the module
// in the utils folder that was provided 
const inputCheck = require('./utils/inputCheck');
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
// this query retrieves all candidates 
app.get('/api/candidates', (req, res) => {
    // const sql = `SELECT * FROM candidates`;
    // This is the updated sql varibale that is using a JOIN query 
    const sql = `SELECT candidates.*, parties.name
                 AS party_name 
                 FROM candidates
                 LEFT JOIN parties
                 ON candidates.party_id = parties.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// The code below was to test if it ran in the terminal 

// db.query(`Select * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// GET a single candidate
app.get('/api/candidate/:id', (req, res) => {
    // const sql = `SELECT * FROM candidates WHERE id = ?`;
    // This is the updated sql varibale that is using a JOIN query 
    const sql = `SELECT candidates.*, parties.name
                 AS party_name 
                 FROM candidates
                 LEFT JOIN parties
                 ON candidates.party_id = parties.id
                 WHERE candidates.id = ?`
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});


// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if(err) {
//         console.log(err)
//     }
//     console.log(row);
// });

// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(result);
// });


// Create a candidate
app.post('/api/candidate/', ({ body }, res) => {
    // NOTE: in this function, since it's not a template literal 
    // it each seperate part is notated as seen blow in the errors function
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
                 VALUES (?,?,?)`
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//              VALUES(?,?,?,?)`
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, results) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(results);
// });


//Created a GET route for parties 
app.get ('/api/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//Creating a GET route for party id's
// Gets a single party 
app.get('/api/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Creating a DELETE route for parties to complete CRUD method
// Deletes a party 
app.delete('/api/party/:id', (req, res) => {
    const sql = 'DELETE FROM parties WHERE id = ?';
    const params = [req.params.id];
    
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            // check if anything was deleted
        } else if (!result.affectedRows) {
            res.json({
                message: 'Party not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: resourceLimits.affectedRows,
                id: req.params.id
            });
        }
    });
});


// Creating a PUT route 
// Updates a candidate's party 
app.put('/api/candidate/:id', (req, res) => {
    const errors = inputCheck(req.body, 'party_id');
    const sql = `UPDATE candidates SET party_id = ?
                 WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];

    // this is calling the errors function I created 
    if (errors) {
        res.status(400).json({ error: errors });
        return; 
    }
    
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            // check if a record was found
        } else if (!result.affectedRows) {
            res.json({ 
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body, 
                changes: result.affectedRows
            });
        }
    });
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