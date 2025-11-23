// routes/index.js
const express = require("express");
const router = express.Router();
const moodsController = require("../controllers/moodsController");

// Public homepage (shows all moods)
router.get("/", moodsController.publicList);

module.exports = router;
