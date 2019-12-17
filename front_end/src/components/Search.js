import React from "react";

import Recipes from "./Recipes";

import axios from "axios";

const baseURL = "http://localhost:3003";

console.log("current base URL in App.js not FormContainer", baseURL);

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      recipe: {},
      createBtn: false,
      keyword: ""
    };
    this.getRecipes = this.getRecipes.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    //this.printRecipe = this.printRecipe.bind(this);
  }
  componentDidMount() {
    this.getRecipes();
  }

  async getRecipes() {
    const response = await axios.get(`${baseURL}/recipes`);
    const recipes = response.data;
  }
  async handleDelete(id) {
    await axios.delete(`${baseURL}/recipes/${id}`);

    const filteredRecipes = this.state.recipes.filter(recipe => {
      return recipe._id !== id;
    });
  }

  handleSearch(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async searchKeyword(event) {
    const recipeData = await axios.get(
      `http://localhost:3003/recipes/search?keyword=${this.state.keyword}`
    );
    const data = recipeData.data;
    this.setState({
      recipes: data
    });
  }
  render() {
    return (
      <main>
        <div>
          <h1>What do you want to cook today? </h1>
        </div>
        <div className="form-group">
          <label htmlFor="search" className="form-label">
            KEYWORD SEARCH
          </label>
          <input
            name="keyword"
            type="text"
            value={this.state.keyword}
            onChange={this.handleSearch}
            placeholder="search term"
          />
          <button onClick={this.searchKeyword}>Search</button>
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

export default Search;
