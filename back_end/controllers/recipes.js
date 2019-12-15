const express = require("express");
const recipes = express.Router();
const Recipe = require("../models/recipes.js");

//ROUTES;
recipes.get("/search", (req, res) => {
  console.log(req.query.category);
  //const searchTags = req.query.tags;
  const searchTags = ["soup", "instant pot"];
  Recipe.find({}, (err, foundRecipes) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    //filter all recipes by category and then by tags
    const newArray = foundRecipes.filter(
      recipe => recipe.category === req.query.category
    );

    const finalArray = newArray.filter(recipe => {
      const tags = recipe.tags;
      return tags.some(tag => searchTags.includes(tag));
    });
    res.status(200).send(finalArray);
  });
});

// recipes.get("/", (req, res) => {
//   Recipe.find({}, (err, foundRecipes) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     }
//     res.status(200).json(foundRecipes);
//   });
// });

recipes.post("/", (req, res) => {
  Recipe.create(req.body, (error, createdRecipe) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).send(createdRecipe);
  });
});

recipes.delete("/:id", (req, res) => {
  Recipe.findByIdAndRemove(req.params.id, req.body, (error, deletedRecipe) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).send(deletedRecipe);
  });
});

recipes.put("/:id", (req, res) => {
  Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedRecipe) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedRecipe);
    }
  );
});
module.exports = recipes;
