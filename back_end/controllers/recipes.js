const express = require("express");
const recipes = express.Router();
const Recipe = require("../models/recipes.js");

//ROUTES;
recipes.get("/search", (req, res) => {
  //variables for query including RegEx for keyword
  console.log("query", req.query);
  const category = req.query.category;
  const searchTags = req.query.tags;
  const keyword = new RegExp(`${req.query.keyword}`, "i", "g");

  //search all recipes in db
  Recipe.find({}, (err, foundRecipes) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    let newArray = foundRecipes;
    //filter all recipes by category and then by tags
    if (category)
      newArray = foundRecipes.filter(recipe => recipe.category === category);

    //filter by tag no category

    if (searchTags) {
      newArray = newArray.filter(recipe => {
        const tags = recipe.tags;
        return tags.some(tag => searchTags.includes(tag));
      });
    }

    if (req.query.keyword) {
      //const regexString = new RegExp(`${keyword}`, "i", "g");
      newArray = newArray.filter(
        recipe =>
          recipe.recipeName.match(keyword) ||
          recipe.ingredients.match(keyword) ||
          recipe.category.match(keyword)
      );
    }

    res.status(200).json(newArray);
  });
});
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
  console.log(req.body);
  const recipeId = req.params;
  Recipe.findByIdAndRemove(req.params.id, (error, deletedRecipe) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).send(deletedRecipe);
  });
});

recipes.put("/:id", (req, res) => {
  console.log(req.body.recipeId);
  Recipe.updateOne(
    { _id: { $eq: req.body.recipeId } },
    req.body,

    (err, updatedRecipe) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedRecipe);
    }
  );
});
module.exports = recipes;
