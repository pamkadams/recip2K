const express = require("express");
const recipes = express.Router();
//const Recipe = require("../models/recipes.js");
//const Tag = require("../models/tags.js");

recipes.get("/", (req, res) => {
  res.send("test");
});
//ROUTES
// Recipe.create(req.body, (error, createdRecipe) => {
//   if (error) {
//     res.status(400).json({ error: error.message });
//   }
//   res.status(200).send(createdRecipe);
// });
//});

module.exports = recipes;
