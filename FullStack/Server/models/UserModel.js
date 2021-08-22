const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
  ],
});


module.exports = mongoose.model("User", userSchema);
