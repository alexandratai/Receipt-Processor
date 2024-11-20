const express = require('express');
const router = express.Router();
const Receipt = require("../models/receipt");

router.get('/', (req, res) => {
    res.send('This is receipts route');
});

const receipts = {};

router.post('/process', (req, res) => {
    const receiptData = req.body;
    const receipt = new Receipt(receiptData);

    if (!receiptData) return res.status(400).json({ error: 'Invalid receipt data' });

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