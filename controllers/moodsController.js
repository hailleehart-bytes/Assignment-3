const MoodEntry = require("../models/MoodEntry");

// Show all moods for the logged-in user
exports.publicList = async (req, res) => {
  try {
    const entries = await MoodEntry.find({ userId: req.session.user?._id }).sort({ date: -1 }).lean();

    entries.forEach(entry => {
      entry.dateFormatted = new Date(entry.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    });

    res.render("moods/list", { title: "Mood Journal", moods: entries });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading entries");
  }
};

// Show form to add a new entry
exports.addEntryForm = (req, res) => {
  res.render("moods/add", { title: "Add Entry" });
};

// Handle saving new entry
exports.saveEntry = async (req, res) => {
  try {
    const { mood, description, date } = req.body;
    const entryDate = date ? new Date(date) : new Date();

    const newEntry = new MoodEntry({
      mood,
      description,
      date: entryDate,
      userId: req.session.user?._id
    });

    await newEntry.save();
    res.redirect("/moods");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving entry");
  }
};

// Show edit form for a specific entry
exports.editEntryForm = async (req, res) => {
  try {
    const entry = await MoodEntry.findOne({ _id: req.params.id, userId: req.session.user?._id }).lean();
    if (!entry) return res.status(404).send("Entry not found");

    entry.date = entry.date ? entry.date.toISOString().substring(0, 10) : '';

    res.render("moods/edit", { title: "Edit Entry", mood: entry });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading entry");
  }
};

// Handle updating an entry
exports.saveEditedEntry = async (req, res) => {
  try {
    const { mood, description, date } = req.body;
    const entryDate = date ? new Date(date) : new Date();

    await MoodEntry.findOneAndUpdate(
      { _id: req.params.id, userId: req.session.user?._id },
      { mood, description, date: entryDate }
    );

    res.redirect("/moods");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating entry");
  }
};

// Show confirmation before deletion
exports.deleteConfirm = async (req, res) => {
  try {
    const entry = await MoodEntry.findOne({ _id: req.params.id, userId: req.session.user?._id }).lean();
    if (!entry) return res.status(404).send("Entry not found");

    res.render("moods/delete_confirm", { title: "Delete Entry", mood: entry });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading entry");
  }
};

// Handle deleting an entry
exports.deleteEntry = async (req, res) => {
  try {
    await MoodEntry.findOneAndDelete({ _id: req.params.id, userId: req.session.user?._id });
    res.redirect("/moods");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting entry");
  }
};

// Optional: view all entries (admin or debug)
exports.entriesList = async (req, res) => {
  try {
    const entries = await MoodEntry.find({ userId: req.session.user?._id }).sort({ date: -1 }).lean();

    entries.forEach(entry => {
      entry.dateFormatted = new Date(entry.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    });

    res.render("moods/list", { title: "All Entries", moods: entries });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading entries");
  }
};
