let Antique = require("../models/antique");
let Comment = require("../models/comment");

// all the middleware goes here
let middlewareObj = {};

middlewareObj.checkAntiquesOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Antique.findById(req.params.id, (err, foundAntique) => {
      if (err) {
        console.log("ssss", err);
      } else {
        if (foundAntique.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
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
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = middlewareObj;
