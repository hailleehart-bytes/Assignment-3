const express = require("express");
const router = express.Router();
const controller = require("../controllers/moodsController");

// List moods for logged-in user
router.get("/", controller.publicList);

// Add entry
router.get("/add", controller.addEntryForm);
router.post("/add", controller.saveEntry);

// Edit entry
router.get("/edit/:id", controller.editEntryForm);
router.post("/edit/:id", controller.saveEditedEntry);

// Delete entry
router.get("/delete/:id", controller.deleteConfirm);
router.post("/delete/:id", controller.deleteEntry);

// Optional: view all entries (user-specific)
router.get("/entries", controller.entriesList);

module.exports = router;
