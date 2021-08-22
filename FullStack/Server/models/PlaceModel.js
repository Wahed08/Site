const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  Date:{
      type: Date,
      default: Date.now
  },
  places: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Place",
    },
  ],
});


module.exports = mongoose.model("User", userSchema);
