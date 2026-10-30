const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON payloads in request body
app.use(express.json());

// In-memory database array (simulating our data storage)
let users = [
    { id: 1, name: 'Alice', email: 'alice@decodelabs.tech' },
    { id: 2, name: 'Bob', email: 'bob@decodelabs.tech' }
];

// ==========================================
// 1. GET ENDPOINT: Retrieve all users
// ==========================================
app.get('/users', (req, res) => {
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
});

// ==========================================
// 2. POST ENDPOINT: Create a new user with validation
// ==========================================
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    // Basic Data Validation: Check if required fields are present
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            error: 'Bad Request: Both "name" and "email" are required fields.'
        });
    }

    // Create a new user object
    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        email
    };

    // Push into our in-memory array
    users.push(newUser);

    // Respond with 201 Created status code
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});