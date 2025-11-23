// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// register
router.get('/register', authController.showRegister);
router.post('/register', authController.register);

// login
router.get('/login', authController.showLogin);
router.post('/login', authController.login);

// logout
router.post('/logout', authController.logout);

module.exports = router;
