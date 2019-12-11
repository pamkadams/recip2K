const mongoose = require("mongoose");
const tagSchema = mongoose.Schema({
  tagName: String,
  userCreated: [{ type: String }]
});

module.exports = mongoose.model("Tag", tagSchema);
