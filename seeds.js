const mongoose = require("mongoose");
const Antique = require("./models/antique");
const Comment = require("./models/comment");
let data = [
  {
    name: "Amman Antiques",
    image:
      "https://media.thatsweetgift.com/wp-content/uploads/2017/10/antiques.png",
    description: "This is an Awesome antique"
  },
  {
    name: "Aqaba Antiques",
    image:
      "https://media.thatsweetgift.com/wp-content/uploads/2017/10/antiques.png",
    description: "This is an Awesome antique"
  },
  {
    name: "Damascus Antiques",
    image:
      "https://www.thoughtco.com/thmb/izTzjufWQzSYBSsgbgMpOEkLiDE=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-488004795-5c70260546e0fb0001b681d6.jpg",
    description: "This is an Awesome antique"
  }
];

function seedDb() {
  // remove all antiques from DB
  Antique.remove({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed Antiques!!");
      data.forEach(seed => {
        Antique.create(seed, (err, antique) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Data Created");
            //create comments
            Comment.create(
              {
                text: "This is a very old antique, 1200 B.C",
                author: "Arabian Guy"
              },
              (err, comment) => {
                if (err) {
                  console.log(err);
                } else {
                  antique.comments.push(comment);
                  antique.save();
                  console.log("Comment Has Created");
                }
              }
            );
          }
        });
      });
    }
  });
  // add antiques
  // add comments
}

module.exports = seedDb;
