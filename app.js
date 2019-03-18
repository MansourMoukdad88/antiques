const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Antique = require("./models/antique");

mongoose.connect("mongodb://localhost:27017/antiques", {
  useNewUrlParser: true
});

// Schema Setup
// let antiqueSchema = new mongoose.Schema({
//   name: String,
//   image: String,
//   description: String
// });

// let Antique = mongoose.model("Antique", antiqueSchema); // this is a pattern for singular bit of data It gonna show as a 'antiques' in the database collection and each one

// Antique.create(
//   {
//     name: "Irbed",
//     image:
//       "https://www.thoughtco.com/thmb/izTzjufWQzSYBSsgbgMpOEkLiDE=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-488004795-5c70260546e0fb0001b681d6.jpg",
//     description: "This is an Awesome antique"
//   },
//   (err, antique) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Newly Create antique ");
//       console.log(antique);
//     }
//   }
// );

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

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
  Antique.findById(req.params.id, (err, foundAntique) => {
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
