// controllers/moodsController.js
const MoodEntry = require('../models/MoodEntry');

// helper: require auth middleware-like behavior in routes
exports.dashboard = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect('/auth/login');
    const entries = await MoodEntry.find({ userId: req.session.user.id }).sort({ date: -1 });
    res.render('moods/list', { entries });
  } catch (err) {
    next(err);
  }
};

exports.publicList = async (req, res, next) => {
  try {
    // show all entries publicly (for assignment requirement)
    const entries = await MoodEntry.find().sort({ date: -1 }).limit(50).populate('userId', 'username');
    res.render('index', { entries });
  } catch (err) {
    next(err);
  }
};

exports.showAddForm = (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');
  res.render('moods/add');
};

exports.createEntry = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect('/auth/login');
    const { moodScore, emotion, journalText, date } = req.body;
    const entry = new MoodEntry({
      moodScore: Number(moodScore),
      emotion,
      journalText,
      date: date ? new Date(date) : undefined,
      userId: req.session.user.id
    });
    await entry.save();
    res.redirect('/dashboard');
  } catch (err) {
    next(err);
  }
};

exports.showEditForm = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect('/auth/login');
    const entry = await MoodEntry.findById(req.params.id);
    if (!entry) return res.redirect('/dashboard');
    // ensure ownership
    if (entry.userId.toString() !== req.session.user.id) return res.status(403).send('Forbidden');
    res.render('moods/edit', { entry });
  } catch (err) {
    next(err);
  }
};

exports.updateEntry = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect('/auth/login');
    const entry = await MoodEntry.findById(req.params.id);
    if (!entry) return res.redirect('/dashboard');
    if (entry.userId.toString() !== req.session.user.id) return res.status(403).send('Forbidden');

    entry.moodScore = Number(req.body.moodScore);
    entry.emotion = req.body.emotion;
    entry.journalText = req.body.journalText;
    entry.date = req.body.date ? new Date(req.body.date) : entry.date;

    await entry.save();
    res.redirect('/dashboard');
  } catch (err) {
    next(err);
  }
};

exports.showDeleteConfirm = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect('/auth/login');
    const entry = await MoodEntry.findById(req.params.id);
    if (!entry) return res.redirect('/dashboard');
    if (entry.userId.toString() !== req.session.user.id) return res.status(403).send('Forbidden');
    res.render('moods/delete_confirm', { entry });
  } catch (err) {
    next(err);
  }
};

exports.deleteEntry = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect('/auth/login');
    const entry = await MoodEntry.findById(req.params.id);
    if (!entry) return res.redirect('/dashboard');
    if (entry.userId.toString() !== req.session.user.id) return res.status(403).send('Forbidden');
    await entry.remove();
    res.redirect('/dashboard');
  } catch (err) {
    next(err);
  }
};
