const express = require('express');
const { subscribe } = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');
const { unsubscribe } = require('../controllers/unsubscribeController');
const router = express.Router();
router.post('/', authMiddleware, subscribe);
router.post('/unsubscribe', authMiddleware, unsubscribe); // Add this line

module.exports = router;