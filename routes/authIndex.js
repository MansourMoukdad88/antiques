const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// root route
router.get("/", (req, res) => {
  res.render("landing");
});

// show register form
router.get("/register", (req, res) => {
  res.render("register");
});

// handle sign up route
router.post("/register", (req, res) => {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.render("register");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/antiques");
      });
    }
  });
});

// Show Login Form
router.get("/login", (req, res) => {
  res.render("login");
});
//Handling Login Logic
//app.post("/login", middleware, callback)
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/antiques",
    failureRedirect: "/login"
  }),
  (req, res) => {
    res.send("login");
  }
);

// Logout Route
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/antiques");
});

// middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
