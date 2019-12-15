const express = require("express");
const recipes = express.Router();
const Recipe = require("../models/recipes.js");

//ROUTES;
// recipes.get("/search", (req, res) => {
//   const category = req.query.category;
//   const searchTags = req.query.tags.split(" ");
//   const searchWords = req.query.recipeName.split(" ");
//   console.log(searchTags);

//   Recipe.find({}, (err, foundRecipes) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     }
//     //filter all recipes by category and then by tags

//     const newArray = foundRecipes.filter(
//       recipe => recipe.category === category
//     );
//     console.log("found dessert", newArray);

//     const finalArray = newArray.filter(recipe => {
//       const tags = recipe.tags;
//       return tags.some(tag => searchTags.includes(tag));
//     });
//     if (recipeName.length > 0) {
//       lowerCaseRecipes = foundRecipes.map(recipe => recipe.recipeName.toLowerCase());
//       lowerCaseRecipes.filter(recipe=> return recipe.searchWordsinQuery.includes(recipe.recipeName)
//     };
//     res.status(200).send(finalArray);
//   });
// });

recipes.get("/", (req, res) => {
  Recipe.find({}, (err, foundRecipes) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundRecipes);
  });
});

recipes.post("/", (req, res) => {
  Recipe.create(req.body, (error, createdRecipe) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).send(createdRecipe);
  });
});

recipes.delete("/:id", (req, res) => {
  console.log(req.params._id);
  Recipe.deleteOne(req.params._id, req.body, (error, deletedRecipe) => {
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
