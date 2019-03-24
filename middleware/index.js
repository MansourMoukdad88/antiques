let Antique = require("../models/antique");
let Comment = require("../models/comment");

// all the middleware goes here
let middlewareObj = {};

middlewareObj.checkAntiquesOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Antique.findById(req.params.id, (err, foundAntique) => {
      if (err) {
        req.flash("error", "Antiques Not Found");
        console.log("ssss", err);
      } else {
        if (foundAntique.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("back");
  }
};

middlewareObj.checkCommentsOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        console.log("ssss", err);
      } else {
        // does user own the comment
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/login");
};

module.exports = middlewareObj;
