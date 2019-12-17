const express = require("express");
const recipes = express.Router();
const Recipe = require("../models/recipes.js");

//ROUTES;
recipes.get("/search", (req, res) => {
  //variables for query including RegEx for keyword
  console.log("keyword", req.body);
  const category = req.query.category;
  const searchTags = req.query.tags;
  const keyword = new RegExp(`${req.query.keyword}`, "i", "g");

  //search all recipes in db
  Recipe.find({}, (err, foundRecipes) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }

    //filter all recipes by category and then by tags
    let newArray = foundRecipes.filter(recipe => recipe.category === category);
    if (searchTags) {
      newArray = newArray.filter(recipe => {
        const tags = recipe.tags;
        return tags.some(tag => searchTags.includes(tag));
      });
    }
    if (newArray.length === 0) newArray.push("No results found.");

    //filter by tag no category
    let tagArray = [];
    if (searchTags && !category) {
      tagArray = foundRecipes.filter(recipe => {
        const tags = recipe.tags;
        return tags.some(tag => searchTags.includes(tag));
      });
    }
    if (tagArray.length === 0) tagArray.push("No results found.");

    //if keyword exists then search the database for it in the four fields below
    let keywordArray = [];

    if (req.query.keyword) {
      //const regexString = new RegExp(`${keyword}`, "i", "g");
      keywordArray = foundRecipes.filter(
        recipe =>
          recipe.recipeName.match(keyword) ||
          recipe.ingredients.match(keyword) ||
          recipe.category.match(keyword)
      );
    }
    if (keywordArray.length === 0) keywordArray.push("No results found.");
    res.status(200).send(keywordArray);
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
