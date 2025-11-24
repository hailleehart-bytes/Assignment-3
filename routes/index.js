const express = require('express');
const router = express.Router();
const MoodEntry = require('../models/MoodEntry'); // import your model

// Home page
router.get("/", (req, res) => {
  res.render("home", { title: "Mood Journal Home" });
});

// Dashboard
router.get('/dashboard', async (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login'); // redirect if not logged in

  try {
    // Fetch the logged-in user's entries
    const entries = await MoodEntry.find({ userId: req.session.user._id })
      .sort({ date: -1 })
      .lean();

    // Format the date
    entries.forEach(entry => {
      entry.dateFormatted = new Date(entry.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    });

    res.render('dashboard', { title: 'Dashboard', entries });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading dashboard');
  }
});

module.exports = router;
