// routes/index.js
const express = require('express');
const router = express.Router();
const moodsController = require('../controllers/moodsController');

// homepage shows public list (assignment requires a public page with documents)
router.get('/', moodsController.publicList);

// dashboard (user-specific)
router.get('/dashboard', moodsController.dashboard);

module.exports = router;
