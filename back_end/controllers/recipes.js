const express = require("express");
const recipes = express.Router();
const Recipe = require("../models/recipes.js");

//ROUTES;
recipes.get("/search", (req, res) => {
  console.log("search successful", req.query.keyword.length);
  const category = req.query.category;
  const searchTags = req.query.tags;
  //const keyword = req.query.keyword;
  const keyword = new RegExp(`${req.query.keyword}`, "i", "g");
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
    let keywordArray;
    //keyword.length doesn't return anything so you have to use the original variable to get the length
    if (req.query.keyword.length > 0) {
      //const regexString = new RegExp(`${keyword}`, "i", "g");
      keywordArray = foundRecipes.filter(
        recipe =>
          recipe.recipeName.match(keyword) || recipe.ingredients.match(keyword)
      );
    }
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
  console.log(req.params._id);
  Recipe.deleteOne(req.params._id, req.body, (error, deletedRecipe) => {
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
