import React from "react";
import FormContainer from "./components/FormContainer";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RecipeFile from "./Recipefile.js";
import Recipes from "./components/Recipes";
import Search from "./components/Search";

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
  // async handleUpdate(id) {
  //   await axios.put(`${baseURL}/recipes/${id}`);
  // }

  render() {
    const renderForm = this.state.createBtn ? <FormContainer /> : <Search />;
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
        {renderForm}
        <Recipes
          recipes={this.state.recipes}
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate}
        />

        <div className="App">
          <RecipeFile title="PDF test" />
        </div>
      </main>
    );
  }
}

export default App;
