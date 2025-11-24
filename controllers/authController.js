const User = require("../models/User");
const bcrypt = require("bcrypt");

// Show login page
exports.loginForm = (req, res) => {
  res.render("auth/login", { title: "Login", error: null });
};

// Handle login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.render("auth/login", { title: "Login", error: "Invalid username or password" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.render("auth/login", { title: "Login", error: "Invalid username or password" });

  req.session.user = user;
  res.redirect("/dashboard");
};

// Show register page
exports.registerForm = (req, res) => {
  res.render("auth/register", { title: "Register", error: null });
};

// Handle registration
exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hash });
  await user.save();
  req.session.user = user;
  res.redirect("/dashboard");
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
