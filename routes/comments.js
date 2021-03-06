const express = require("express");
const router = express.Router();
const Antique = require("../models/antique");
const Comment = require("../models/comment");
let middleware = require("../middleware");

// Comments New
router.get("/antiques/:id/comments/new", middleware.isLoggedIn, (req, res) => {
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
router.post("/antiques/:id/comments", middleware.isLoggedIn, (req, res) => {
  // Lookup new comment by id
  Antique.findById(req.params.id, (err, antique) => {
    if (err) {
      console.log(err);
      res.redirect("/antiques");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash("error", "Something went wrong");
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
          req.flash("success", "Successfully added comment");
          res.redirect("/antiques/" + antique._id);
        }
      });
    }
  });
});
// Comments Edit
router.get(
  "/antiques/:id/comments/:comment_id/edit",
  middleware.checkCommentsOwnership,
  (req, res) => {
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
  }
);
// Comment Update
router.put(
  "/antiques/:id/comments/:comment_id",
  middleware.checkCommentsOwnership,
  (req, res) => {
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
  }
);
// Destroy Route
router.delete(
  "/antiques/:id/comments/:comment_id",
  middleware.checkCommentsOwnership,
  (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id, err => {
      if (err) {
        res.redirect("back");
      } else {
        req.flash("success", "Comment deleted");

        res.redirect("/antiques/" + req.params.id);
      }
    });
  }
);

// Middleware

module.exports = router;
