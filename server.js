// This variableis importing the express package 
const express = require('express');

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
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// In terminal it will log the PORT when the server is running 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});