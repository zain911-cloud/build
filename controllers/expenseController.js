// expenseController.js
const Expense = require('../../models/Expense');

exports.addExpense = async (req, res) => {
    const { expenseName, amount, location } = req.body;
    try {
        const newExpense = new Expense({
            expenseName,
            amount,
            location,
            user: req.user.id,
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
