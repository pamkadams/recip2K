import React from "react";
import Recipe from "./Recipe";

function Recipes(props) {
  const { recipes, handleDelete, handleUpdate } = props;
  return (
    <div>
      {recipes.map(recipe => (
        <Recipe
          key={recipe._id}
          recipe={recipe}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
export default Recipes;
