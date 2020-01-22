let mongoose = require("./../database");

let PersonSchema = new mongoose.Schema({
  name: String,
  mobile: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("Person", PersonSchema);
