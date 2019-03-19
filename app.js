const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Antique = require("./models/antique");
//const Comment = require("./models/comments");
const seedDb = require("./seeds");

mongoose.connect("mongodb://localhost:27017/antiques", {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
seedDb();

app.get("/", (req, res) => {
  res.render("landing");
});
// INDEX - Show all Antiques
app.get("/antiques", (req, res) => {
  // Get all Antiques from DB
  Antique.find({}, (err, allAntique) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { antiques: allAntique });
    }
  });
});

// Create - Add A New Antiques to Db
app.post("/antiques", (req, res) => {
  // res.send("You ht the post route");
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newAntique = { name: name, image: image, description: description };
  // antiques.push(newAntique);
  //Create a new Antique and save to DB
  Antique.create(newAntique, (err, antiques) => {
    if (err) {
      console.log(err);
    } else {
      console.log(antiques);
      res.redirect("/antiques");
    }
  });
});
// NEW - Show form to create new Antique
app.get("/antiques/new", (req, res) => {
  res.render("new.ejs");
});
// SHOW - show more info about one Antique
app.get("/antiques/:id", (req, res) => {
  // Find the Antique with the provided ID
  Antique.findById(req.params.id)
    .populate("comments")
    .exec((err, foundAntique) => {
      if (err) {
        console.log(err);
      } else {
        // render show template with that Antique
        res.render("show", { antique: foundAntique });
      }
    });
});

app.listen(3000, () => {
  console.log("The Antique Server Has  Started!!");
});
