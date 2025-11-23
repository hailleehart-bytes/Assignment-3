// ------------------------------------------------------------
// app.js - Main server file for Mood Journal
// ------------------------------------------------------------

// Load environment variables
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const path = require('path');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');   // <-- Layout engine

const app = express();

// ------------------------------------------------------------
// Database Connection
// ------------------------------------------------------------
require('./config/db'); // connects using MONGO_URI from .env

// ------------------------------------------------------------
// Middleware
// ------------------------------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------------------------------------------
// EJS + Layouts
// ------------------------------------------------------------
app.set('view engine', 'ejs');
app.use(expressLayouts);                 // Enable express-ejs-layouts
app.set('layout', 'layouts/main');       // Default layout file

// ------------------------------------------------------------
// Sessions
// ------------------------------------------------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "devSecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions"
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
  })
);

// Make user available in all EJS templates
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// ------------------------------------------------------------
// Routes
// ------------------------------------------------------------
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/moods');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/moods', moodRoutes);

// ------------------------------------------------------------
// Error Handler
// ------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke! Check terminal for error details.");
});

// ------------------------------------------------------------
// Start Server
// ------------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mood Journal running on http://localhost:${PORT}`);
});
