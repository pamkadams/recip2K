//renders all of the form elements and handles business logic for the form. It also updates the state, handles form submission, and makes API calls
import React, { Component } from "react";
//Here are all the stateless form components choose the ones you need
import Axios from "axios";
import CheckBox from "./CheckBox";
import Input from "./Input";
import Select from "./Select";

import Button from "./Button";

class Search extends Component {
  //build out the form fields here. e.g. recipe change the searchRecipe to searchRecipe
  constructor(props) {
    super(props);
    this.state = {
      searchRecipe: {
        keyword: "",
        category: "",
        tags: []
      },
      category: [
        "breakfast",
        "lunch",
        "dinner",
        "appetizer",
        "drinks",
        "dessert"
      ],
      tags: [
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
    this.handleInput = this.handleInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);

    this.handleKeyword = this.handleKeyword.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }
  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => {
      return {
        searchRecipe: {
          [name]: value
        }
      };
    });
  }

  handleKeyword(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        searchRecipe: { ...prevState.searchRecipe, keyword: value }
      }),
      () => console.log(this.state.searchRecipe)
    );
  }

  handleCheckBox(e) {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.searchRecipe.tags.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.searchRecipe.tags.filter(
        s => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.searchRecipe.tags, newSelection];
    }
    this.setState(prevState => ({
      searchRecipe: { ...prevState.searchRecipe, tags: newSelectionArray }
    }));
  }

  async handleFormSubmit(e) {
    //form submission logic
    e.preventDefault();
    let recipeData = this.state.searchRecipe;
    const response = await Axios.put(
      `http://localhost:3003/recipes/search`,
      recipeData
    );
    const data = response.data;
    this.setState({
      recipes: data
    });
    console.log("Search successful" + data);
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      searchRecipe: {
        recipeName: "",
        category: "",
        tags: []
      }
    });
  }

  render() {
    return (
      <div>
        <h2>Search for Recipes</h2>;
        <form className="container" onSubmit={this.handleFormSubmit}>
          <fieldset>
            <div className="input_block">
              <p>
                Enter the recipe information below and then press Search to
                locate the recipe in the database.
              </p>
            </div>
            <Input
              input
              type={"text"}
              title={"Keyword"}
              name={"keyword"}
              value={this.state.searchRecipe.keyword}
              placeholder={"Keyword Search"}
              handlechange={this.handleInput}
            />
            <Select
              title={"Category"}
              name={"category"}
              options={this.state.category}
              value={this.state.searchRecipe.category}
              placeholder={"Select meal category/course"}
              handlechange={this.handleInput}
            />
            <CheckBox
              title={"Tags"}
              name={"tags"}
              options={this.state.tags}
              selectedOptions={this.state.searchRecipe.tags}
              handlechange={this.handleCheckBox}
            />

            <Button
              action={this.handleFormSubmit}
              type={"primary"}
              title={"Search"}
              style={buttonStyle}
            />
            {/* Submit */}
            <Button
              action={this.handleClearForm}
              type={"secondary"}
              title={"Clear"}
              style={buttonStyle}
            />
            {/* Clear the form */}
          </fieldset>
        </form>
      </div>
    );
  }
}
const buttonStyle = {
  margin: "10px"
};
export default Search;
