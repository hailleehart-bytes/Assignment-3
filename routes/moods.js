// routes/moods.js
const express = require('express');
const router = express.Router();
const moodsController = require('../controllers/moodsController');

// add new entry
router.get('/add', moodsController.showAddForm);
router.post('/add', moodsController.createEntry);

// edit entry
router.get('/edit/:id', moodsController.showEditForm);
router.put('/edit/:id', moodsController.updateEntry);

// delete confirmation
router.get('/delete/:id', moodsController.showDeleteConfirm);
router.delete('/delete/:id', moodsController.deleteEntry);

module.exports = router;
