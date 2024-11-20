const express = require('express');
const app = express();

// Middleware to parse JSON payloads
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to my receipt processor!</h1>')
});

// Import receipts route
const receiptsRoute = require('./routes/receipts');
app.use('/receipts', receiptsRoute);

// Set port and start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
