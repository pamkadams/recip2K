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
        "",
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
    this.handleClearForm = this.handleClearForm.bind(this);
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
    this.setState({ checked: e.target.checked });
    if (this.state.tags.includes(e.target.value)) {
      this.state.tags.splice(this.state.tags.indexOf(e.target.value), 1);
    } else {
      await this.setState({ tags: [...this.state.tags, e.target.value] });
      console.log("tags", this.state.tags);
    }
  }

  async searchKeyword(event) {
    event.preventDefault();
    console.log("called");
    let searchStringArray = [];
    let tagString = "";
    if (this.state.category.length > 0)
      searchStringArray = [`category=${this.state.category}`];
    if (this.state.keyword && searchStringArray.length > 0)
      searchStringArray = [...searchStringArray, "&keyword="];
    if (this.state.keyword && searchStringArray.length === 0)
      searchStringArray = [...searchStringArray, "keyword="];
    if (this.state.keyword.length > 0)
      searchStringArray = [...searchStringArray, this.state.keyword];
    let str = searchStringArray.join("");
    if (this.state.tags.length > 0 && str.length > 0) tagString = "&tags=";
    if (this.state.tags.length > 0 && str.length === 0) tagString = "tags=";
    if (this.state.tags.length > 0) {
      this.state.tags.map(tag => {
        tagString += `${tag},`;
      });
      str += tagString.substring(0, tagString.length - 1);
    }
    console.log("array", searchStringArray);
    console.log("str", str);
    await this.setState({ searchString: str });
    console.log("str after setting state", this.state.searchString);
    console.log("empty", this.state.searchString);

    const recipeData = await axios.get(
      `http://localhost:3003/recipes/search?${this.state.searchString}`
    );

    const data = recipeData.data;
    this.setState({
      recipes: data
    });
  }

  handleClearForm(e) {
    e.preventDefault();
    const form = document.getElementById("search-field-form");
    form.reset();
    this.setState({
      keyword: "",
      category: "",
      tags: [],
      searchString: "",

      dropDownCategories: [
        "",
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
    });
  }

  render() {
    return (
      <main>
        <div>
          <h1>What do you want to cook today? </h1>
        </div>

        {/* <div className="form-group">
          <label htmlFor="search" className="form-label"> */}
        <form className="form-group" id="search-field-form">
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

          <button onClick={this.handleClearForm}>Reset Search</button>
        </form>
        {/* </div> */}
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
