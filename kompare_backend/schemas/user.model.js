var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  grade: {
    type: Number,
    required: true,
    unique: false,
  },
  allergies: {
    type: String,
    unique: false,
    default: "No allergies",
  },
  emergencyContact: {
    type: String,
    required: true,
  },
  emergencyPhone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
