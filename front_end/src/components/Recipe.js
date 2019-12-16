import React, { Component } from "react";
import FormContainer from "./FormContainer";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisible: false
    };
    this.toggleForm = this.toggleForm.bind(this);
  }
  toggleForm() {
    this.setState(prevState => ({
      formVisible: !prevState.formVisible
    }));
  }
  render() {
    const { recipe, handleDelete, handleUpdate } = this.props;

    return (
      <>
        {this.state.formVisible ? (
          <FormContainer
            recipe={recipe}
            handleFormSubmit={handleUpdate}
            toggleForm={this.toggleForm}
          />
        ) : (
          <div>
            <h3>{recipe.recipeName}</h3>
            <h4>ingredients</h4>
            <p>{recipe.ingredients}</p>
            <h4>instructions</h4>
            <p>{recipe.instructions}</p>
            <a href={recipe.recipeUrl}>Original Source</a>
            <button onClick={() => handleDelete(recipe._id)}>Delete</button>
            <button onClick={this.toggleForm}>Edit this recipe</button>
          </div>
        )}
      </>
    );
  }
}

export default Recipe;
