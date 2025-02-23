const express = require('express');
const { getPersonalizedContent } = require('../controllers/contentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/personalized', authMiddleware, getPersonalizedContent);

module.exports = router;
