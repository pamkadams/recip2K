import React from "react";

import "./App.css";

import Recipes from "./components/Recipes";

import axios from "axios";

const baseURL = "http://localhost:3003";

console.log("current base URL in App.js not FormContainer", baseURL);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      recipe: {},
      createBtn: false
    };
    this.getRecipes = this.getRecipes.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeForm = this.changeForm.bind(this);

    //this.printRecipe = this.printRecipe.bind(this);
  }
  componentDidMount() {
    this.getRecipes();
  }
  changeForm() {
    this.setState(prevState => ({
      createBtn: !prevState.createBtn
    }));
  }

  async getRecipes() {
    const response = await axios.get(`${baseURL}/recipes`);
    const recipes = response.data;

    this.setState({ recipes: recipes });
  }

  async handleDelete(id) {
    await axios.delete(`${baseURL}/recipes/${id}`);

    const filteredRecipes = this.state.recipes.filter(recipe => {
      return recipe._id !== id;
    });

    this.setState({
      recipes: filteredRecipes
    });
  }

  render() {
    return (
      <main>
        <div>
          <h1>What do you want to cook today? </h1>

          <button onClick={this.changeForm}>Add a recipe</button>
          <img
            id="recipe_chevron"
            src="images/recipe_chevron_orange.png"
            title="recipe icon"
            height="15%"
            width="15%"
          />
        </div>

        <Recipes
          recipes={this.state.recipes}
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate}
        />
      </main>
    );
  }
}

export default App;
