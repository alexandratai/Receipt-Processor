const express = require('express');
const router = express.Router();
const Receipt = require("../models/receipt");

router.get('/', (req, res) => {
    res.send('This is the receipts route');
});

const receipts = {};

router.post('/process', (req, res) => {
    const receiptData = req.body;
    
    if (!receiptData) return res.status(400).json({ error: 'Invalid receipt data' });
    
    const receipt = new Receipt(receiptData);
    receipts[receipt.id] = receipt;
    res.json({ id: receipt.id });
});

router.get('/:id/points', (req, res) => {
    const receipt = receipts[req.params.id];

    if (!receipt) {
        return res.status(404).json({ error: 'Receipt not found' });
    };

    res.json({ points: receipt.points });
});

module.exports = router;