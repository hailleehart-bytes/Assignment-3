const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

// Sessions
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false
}));

// Make user available in templates
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');  // ⭐ REQUIRED FOR OPTION B ⭐

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/moods', require('./routes/moods'));

// MongoDB connection
mongoose.connect("mongodb+srv://MoodUser:ChooseAStrongPassword@cluster0.hyl7ywa.mongodb.net/mooddb")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
