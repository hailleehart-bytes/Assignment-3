const express = require("express");
const router = express.Router();
const controller = require("../controllers/moodsController");

// Home page
router.get("/", controller.publicList);

// Add Entry page (GET)
router.get("/add", controller.addEntryForm);

// Entries list page
router.get("/entries", controller.entriesList);

// Add Entry (POST)
router.post("/add", controller.saveEntry);

module.exports = router;
