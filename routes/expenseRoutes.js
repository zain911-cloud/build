// routes/expenseRoutes.js
const express = require('express');
const Expense = require('../models/Expense');
const verifyToken = require('../middleware/verifyToken'); // Middleware to verify token
const router = express.Router();

// Create an expense
router.post('/', verifyToken, async (req, res) => {
    const { description, amount } = req.body;

    try {
        // Create new expense
        const newExpense = new Expense({ description, amount, userId: req.user.id }); // Make sure to associate with user
        await newExpense.save();
        res.status(201).json({ message: 'Expense created successfully', expense: newExpense });
    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ message: 'Failed to create expense' });
    }
});

// Get all expenses for a user
router.get('/', verifyToken, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }); // Fetch only expenses for the logged-in user
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Failed to fetch expenses' });
    }
});

module.exports = router;
