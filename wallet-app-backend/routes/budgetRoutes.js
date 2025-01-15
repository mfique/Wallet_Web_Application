const express = require('express');
const { createBudget, getBudgets } = require('../controllers/budgetController');
const router = express.Router();

router.post('/', createBudget);
router.get('/', getBudgets);

module.exports = router;
