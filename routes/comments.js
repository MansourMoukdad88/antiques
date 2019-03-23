const express = require("express");
const router = express.Router();
const Antique = require("../models/antique");
const Comment = require("../models/comment");

// Comments New
router.get("/antiques/:id/comments/new", isLoggedIn, (req, res) => {
  // find antiques by id
  Antique.findById(req.params.id, (err, antique) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { antique: antique });
    }
  });
});

// Comments Create
router.post("/antiques/:id/comments", isLoggedIn, (req, res) => {
  // Lookup new comment by id
  Antique.findById(req.params.id, (err, antique) => {
    if (err) {
      console.log(err);
      res.redirect("/antiques");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          // add id and username to comment
          // save to db
          console.log("qqqqqqqqq", req.user.username);
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          antique.comments.push(comment);
          antique.save();
          console.log(comment);
          res.redirect("/antiques/" + antique._id);
        }
      });
    }
  });
});
// Comments Edit
router.get("/antiques/:id/comments/:comment_id/edit", (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComments) => {
    console.log(req.params);
    if (err) {
      res.redirect("back");
    }
    {
      res.render("comments/edit", {
        antique_id: req.params.id,
        comment: foundComments
      });
    }
  });
});
// Comment Update
router.put("/antiques/:id/comments/:comment_id", (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, updatedComment) => {
      if (err) {
        res.redirect("back");
      } else {
        res.redirect("/antiques/" + req.params.id);
      }
    }
  );
});
// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
