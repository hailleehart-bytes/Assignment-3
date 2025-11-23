// models/MoodEntry.js
const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
  moodScore: { type: Number, required: true, min: 1, max: 5 },
  emotion: { type: String, required: true },
  journalText: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('MoodEntry', moodEntrySchema);
