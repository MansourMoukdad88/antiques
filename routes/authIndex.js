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
  res.render("register", { page: "register" });
});

// handle sign up route
router.post("/register", (req, res) => {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register", { error: err.message });
    } else {
      passport.authenticate("local")(req, res, () => {
        req.flash(
          "success",
          "Successfully Signed Up! Nice to meet you " + req.body.username
        );
        res.redirect("/antiques");
      });
    }
  });
});

// Show Login Form
router.get("/login", (req, res) => {
  res.render("login", { page: "login" });
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
  req.flash("success", "Logged You Out!");
  res.redirect("/antiques");
});

// middleware
module.exports = router;
