const express = require("express");
const router = express.Router();
const Antique = require("../models/antique");
const Comment = require("../models/comment");
let middleware = require("../middleware");

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
router.post("/antiques", middleware.isLoggedIn, (req, res) => {
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
router.get("/antiques/new", middleware.isLoggedIn, (req, res) => {
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

// Edit Antique Route
router.get(
  "/antiques/:id/edit",
  middleware.checkAntiquesOwnership,
  (req, res) => {
    // if user login
    Antique.findById(req.params.id, (err, foundAntique) => {
      res.render("antiques/edit", { antique: foundAntique });
    });
  }
);

// Update Antique Route
router.put("/antiques/:id", middleware.checkAntiquesOwnership, (req, res) => {
  //Find and Update the correct antique
  Antique.findByIdAndUpdate(
    req.params.id,
    req.body.antique,
    (err, updatedAntique) => {
      if (err) {
        console.log("wwwwww", err);
        res.redirect("/antiques");
      } else {
        res.redirect("/antiques/" + req.params.id);
      }
    }
  );
  // Redirect somewhere(Show Page)
});

//Destroy Antiques Route
router.delete(
  "/antiques/:id",
  middleware.checkAntiquesOwnership,
  (req, res) => {
    Antique.findByIdAndRemove(req.params.id, err => {
      if (err) {
        res.redirect("/antiques");
      } else {
        res.redirect("/antiques");
      }
    });
  }
);

// middleware

module.exports = router;
