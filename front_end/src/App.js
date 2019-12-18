import React from "react";

import "./App.css";

import Recipes from "./components/Recipes";

import axios from "axios";

let baseURL = "https://recip2k.herokuapp.com";

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
}

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
