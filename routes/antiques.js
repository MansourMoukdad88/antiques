const express = require("express");
const router = express.Router();
const Antique = require("../models/antique");
const Comment = require("../models/comment");

// INDEX - Show all Antiques
router.get("/antiques", (req, res) => {
  // Get all Antiques from DB
  console.log(req.user);
  Antique.find({}, (err, allAntique) => {
    if (err) {
      console.log(err);
    } else {
      res.render("antiques/index", {
        antiques: allAntique,
        currentUser: req.user
      });
    }
  });
});

// Create - Add A New Antiques to Db
router.post("/antiques", isLoggedIn, (req, res) => {
  // res.send("You ht the post route");
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  let newAntique = {
    name: name,
    image: image,
    description: description,
    author: author
  };
  // antiques.push(newAntique);
  //Create a new Antique and save to DB
  Antique.create(newAntique, (err, antiques) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Created ........", antiques);
      res.redirect("/antiques"); // =================
    }
  });
});
// NEW - Show form to create new Antique
router.get("/antiques/new", isLoggedIn, (req, res) => {
  res.render("antiques/new");
});
// SHOW - show more info about one Antique
router.get("/antiques/:id", (req, res) => {
  // Find the Antique with the provided ID
  Antique.findById(req.params.id)
    .populate("comments")
    .exec((err, foundAntique) => {
      if (err) {
        console.log(err);
      } else {
        // render show template with that Antique
        res.render("antiques/show", { antique: foundAntique });
      }
    });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
