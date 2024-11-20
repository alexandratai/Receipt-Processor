const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>')
});

const receiptsRoute = require('./routes/receipts');

app.use('/receipts', receiptsRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});