const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

const dbConfig = {
    host: 'db', 
    user: 'root',
    password: 'root',
    database: 'people'
};

// Array of random names
const names = ['Keanu', 'Will', 'Alex', 'Jonathan', 'Alfredo', 'Oscar', 'Lando', 'Lewis', 'Esteban', 'Corey'];

// Route to add a random name and display the list
app.get('/', async (req, res) => {
    const connection = await mysql.createConnection(dbConfig);

    // Pick a random name from the array
    const randomName = names[Math.floor(Math.random() * names.length)];

    // Add the random name to the database
    await connection.query(`INSERT INTO people (name) VALUES ('${randomName}')`);

    // Get all names from the people table
    const [rows] = await connection.query('SELECT name FROM people');
    
    const namesList = rows.map(row => row.name).join('<br>');

    res.send(`
        <h1>Full Cycle Rocks!</h1>
        <p>Names list registered in the database:</p>
        ${namesList}
    `);

    await connection.end();
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
