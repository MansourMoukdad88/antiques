const mongoose = require("mongoose");
let antiqueSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});
module.exports = mongoose.model("Antique", antiqueSchema); // this is a pattern for singular bit of data It gonna show as a 'antiques' in the database collection and each one
