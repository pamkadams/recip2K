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
    const { recipe, handleDelete, handleUpdate, getRecipes } = this.props;

    return (
      <>
        {this.state.formVisible ? (
          <FormContainer
            recipe={recipe}
            handleFormSubmit={handleUpdate}
            toggleForm={this.toggleForm}
            getRecipes={getRecipes}
          />
        ) : (
          <div>
            <hr></hr>
            <h3 className="title">{recipe.recipeName}</h3>
            <h3 className="sub_title">ingredients</h3>
            <p className="ingredients">{recipe.ingredients}</p>
            <h3 className="sub_title">instructions</h3>
            <p className="ingredients">{recipe.instructions}</p>
            <a id="original_source" href={recipe.recipeUrl}>
              original source (if available)
            </a>
            <button id="btn" onClick={() => handleDelete(recipe._id)}>
              Delete
            </button>
            <button onClick={this.toggleForm}>Edit this recipe</button>
          </div>
        )}
      </>
    );
  }
}

export default Recipe;
