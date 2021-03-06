const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const Antique = require("./models/antique");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDb = require("./seeds");
// require routes
const antiquesRoutes = require("./routes/antiques");
const commentRoutes = require("./routes/comments");
const authRoutes = require("./routes/authIndex");
// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "Hello world",
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");

  next();
});
mongoose.connect("mongodb://localhost:27017/antiques", {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDb(); // see the database

app.use(authRoutes);
app.use(antiquesRoutes);
app.use(commentRoutes);

app.listen(3000, () => {
  console.log("The Antique Server Has  Started!!");
});
