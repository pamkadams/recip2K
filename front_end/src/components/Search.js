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
      //search fields
      keyword: "",
      category: "",
      tags: [],
      searchString: "",
      dropDownCategories: [
        "breakfast",
        "lunch",
        "dinner",
        "appetizer",
        "drinks",
        "dessert"
      ],
      checkBoxTags: [
        "instant pot",
        "soup",
        "pastries",
        "family recipe",
        "Asian",
        "Indian",
        "Mexican",
        "salads",
        "summer",
        "holidays",
        "entertaining"
      ]
    };
    this.getRecipes = this.getRecipes.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleTag = this.handleTag.bind(this);
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

  async handleSearch(event) {
    const { name, value } = event.target;
    await this.setState({ [name]: value });
  }

  async handleCategory(event) {
    const { name, value } = event.target;
    await this.setState({ [name]: value });
    console.log("category", this.state.category);
  }
  async handleTag(e) {
    await this.setState({ tags: [...this.state.tags, e.target.value] });
    console.log("tags", this.state.tags);
  }

  async searchKeyword(event) {
    console.log("called");
    let searchStringArray = [];
    if (this.state.category.length > 0)
      searchStringArray = [`category=${this.state.category}`];
    if (this.state.tags.length > 0 && searchStringArray.length > 0)
      searchStringArray = [...searchStringArray, "||tag="];
    if (this.state.tags.length > 0)
      this.state.tags.map(tag => searchStringArray.push(tag));
    if (this.state.keyword && searchStringArray.length > 0)
      searchStringArray = [...searchStringArray, "||keyword="];
    if (this.state.keyword.length > 0)
      searchStringArray = [...searchStringArray, this.state.keyword];
    console.log("array", searchStringArray);
    let str = searchStringArray.join("");
    console.log("str", str);
    await this.setState({ searchString: str });
    console.log("empty", this.state.searchString);

    const recipeData = await axios.get(
      `http://localhost:3003/recipes/search?${this.state.searchString}`
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

          <div className="form-group">
            <label htmlFor="category">CATEGORY SEARCH</label>
            <select
              name="category"
              value={this.state.category}
              onChange={this.handleCategory}
            >
              <option value=" " disabled>
                " "
              </option>
              {this.state.dropDownCategories.map(option => {
                return (
                  <option key={option} value={option} label={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <div className="checkbox-group">
              {this.state.checkBoxTags.map(option => {
                return (
                  <label key={option}>
                    <input
                      name={option}
                      onChange={this.handleTag}
                      value={option}
                      type="checkbox"
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          </div>

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
