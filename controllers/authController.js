// controllers/authController.js
const User = require('../models/User');

exports.showRegister = (req, res) => {
  res.render('register');
};

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // basic validation
    if (!username || !password) {
      return res.render('register', { error: 'Username and password required.' });
    }
    const existing = await User.findOne({ username });
    if (existing) {
      return res.render('register', { error: 'Username already taken.' });
    }
    const user = new User({ username, password });
    await user.save();
    // set session
    req.session.user = { id: user._id, username: user.username };
    res.redirect('/dashboard');
  } catch (err) {
    next(err);
  }
};

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.render('login', { error: 'Invalid credentials.' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.render('login', { error: 'Invalid credentials.' });

    req.session.user = { id: user._id, username: user.username };
    res.redirect('/dashboard');
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err);
    res.redirect('/');
  });
};
