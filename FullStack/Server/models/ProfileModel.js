const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
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
});


module.exports = mongoose.model("Profile", profileSchema);
