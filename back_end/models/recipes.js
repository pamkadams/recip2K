const mongoose = require("mongoose");
const recipeSchema = mongoose.Schema({
  recipeName: String,
  servings: Number,
  recipeUrl: String,
  category: String,
  tags: [{ type: String }],
  ingredients: String,
  instructions: String
});

module.exports = mongoose.model("Recipe", recipeSchema);
