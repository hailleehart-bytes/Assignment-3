const mongoose = require("mongoose");

const MoodEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  mood: {
    type: String,
    required: true
  },
  description: { // changed from 'note' to 'description'
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("MoodEntry", MoodEntrySchema);
