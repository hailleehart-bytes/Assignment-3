// controllers/moodsController.js
const MoodEntry = require("../models/MoodEntry");

// Home page showing latest entries
exports.publicList = async (req, res) => {
  try {
    const entries = await MoodEntry.find().sort({ date: -1 }).lean();
    res.render("moods/list", { title: "Mood Journal", entries });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading entries");
  }
};

// Show form to add a new entry
exports.addEntryForm = (req, res) => {
  res.render("moods/add", { title: "Add Entry" });
};

// Handle adding new entry
exports.saveEntry = async (req, res) => {
  try {
    const { mood, journalText } = req.body;

    const newEntry = new MoodEntry({
      mood,
      journalText,
      date: new Date()
    });

    await newEntry.save();
    res.redirect("/moods");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving entry");
  }
};

// Show all entries
exports.entriesList = async (req, res) => {
  try {
    const entries = await MoodEntry.find().sort({ date: -1 }).lean();
    res.render("moods/list", { title: "All Entries", entries });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading entries");
  }
};

// Show form to edit an entry
exports.editEntryForm = async (req, res) => {
  try {
    const entry = await MoodEntry.findById(req.params.id).lean();
    if (!entry) return res.status(404).send("Entry not found");
    res.render("moods/edit", { title: "Edit Entry", entry });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading entry");
  }
};

// Handle deleting an entry (confirmation page)
exports.deleteConfirm = async (req, res) => {
  try {
    const entry = await MoodEntry.findById(req.params.id).lean();
    if (!entry) return res.status(404).send("Entry not found");
    res.render("moods/delete_confirm", { title: "Delete Entry", entry });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading entry");
  }
};

// Handle actual deletion
exports.deleteEntry = async (req, res) => {
  try {
    await MoodEntry.findByIdAndDelete(req.params.id);
    res.redirect("/moods");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting entry");
  }
};
