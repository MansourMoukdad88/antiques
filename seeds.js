const mongoose = require("mongoose");
const Antique = require("./models/antique");
const Comment = require("./models/comment");
let data = [
  {
    name: "Amman Antiques",
    image:
      "https://media.thatsweetgift.com/wp-content/uploads/2017/10/antiques.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    name: "Aqaba Antiques",
    image:
      "https://media.thatsweetgift.com/wp-content/uploads/2017/10/antiques.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    name: "Damascus Antiques",
    image:
      "https://www.thoughtco.com/thmb/izTzjufWQzSYBSsgbgMpOEkLiDE=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-488004795-5c70260546e0fb0001b681d6.jpg",
    description:
      "TLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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
