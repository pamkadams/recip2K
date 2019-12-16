//renders all of the form elements and handles business logic for the form. It also updates the state, handles form submission, and makes API calls
import React, { Component } from "react";
//Here are all the stateless form components choose the ones you need
import Axios from "axios";
import CheckBox from "./CheckBox";
import Input from "./Input";
import TextArea from "./TextArea";
import Select from "./Select";
import Button from "./Button";

class FormContainer extends Component {
  //build out the form fields here. e.g. recipe change the newRecipe to newRecipe
  constructor(props) {
    super(props);
    this.state = {
      newRecipe: {
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

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => {
      return {
        newRecipe: {
          ...prevState.newRecipe,
          [name]: value
        }
      };
    });
  }

  handleName(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      newRecipe: { ...prevState.newRecipe, recipeName: value }
    }));
  }

  handleServings(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      newRecipe: { ...prevState.newRecipe, servings: value }
    }));
  }

  handleCheckBox(e) {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.newRecipe.tags.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newRecipe.tags.filter(
        s => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.newRecipe.tags, newSelection];
    }
    this.setState(prevState => ({
      newRecipe: { ...prevState.newRecipe, tags: newSelectionArray }
    }));
  }

  handleTextArea(e) {
    console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(prevState => ({
      newRecipe: {
        ...prevState.newRecipe,
        about: value
      }
    }));
  }

  async handleFormSubmit(e) {
    //form submission logic
    e.preventDefault();
    let recipeData = this.state.newRecipe;
    const response = await Axios.post(
      `http://localhost:3003/recipes`,
      recipeData
    );
    const data = response.data;
    this.setState({
      recipes: data
    });
    console.log("Successful" + data);
    this.setState({
      newRecipe: {
        recipeName: "",
        servings: "",
        recipeURL: "",
        category: "",
        tags: [],
        ingredients: "",
        instructions: ""
      }
    });
  }

  render() {
    return (
      <div>
        <h2>Adding a Recipe</h2>;
        <form className="container" onSubmit={this.handleFormSubmit}>
          <fieldset>
            <legend id="#add">Add a Recipe</legend>
            <div className="input_block">
              <p>
                Enter the recipe information below and then press Submit to
                enter it into the database.
              </p>
            </div>
            <Input
              input
              type={"text"}
              title={"Recipe Name"}
              name={"recipeName"}
              value={this.state.newRecipe.recipeName}
              placeholder={"Enter the name of the recipe"}
              handlechange={this.handleInput}
            />
            {/* Name of the recipe */}
            <Input
              input
              type={"number"}
              title={"Servings"}
              name={"servings"}
              value={this.state.newRecipe.servings}
              handlechange={this.handleServings}
            />
            {/* servings */}
            <Input
              input
              type={"text"}
              title={"Original URL"}
              name={"recipeURL"}
              value={this.state.newRecipe.recipeURL}
              placeholder={"Enter the URL for the original recipe"}
              handlechange={this.handleInput}
            />
            {/* Name of the recipe */}
            <Select
              title={"Category"}
              name={"category"}
              options={this.state.category}
              value={this.state.newRecipe.category}
              placeholder={"Select meal category/course"}
              handlechange={this.handleInput}
            />
            {/*meal */}
            <CheckBox
              title={"Tags"}
              name={"tags"}
              options={this.state.tags}
              selectedOptions={this.state.newRecipe.tags}
              handlechange={this.handleCheckBox}
            />
            {/* List of recipe tags */}
            <TextArea
              title={"Ingredients"}
              rows={20}
              value={this.state.newRecipe.ingredients}
              name={"ingredients"}
              handlechange={this.handleInput}
              placeholder={"Add one ingredient per line"}
            />
            {/* ingredients*/}
            <TextArea
              title={"Instructions"}
              rows={20}
              value={this.state.newRecipe.instructions}
              name={"instructions"}
              handlechange={this.handleInput}
              placeholder={"Add recipe instructions"}
            />
            {/* instructions*/}
            <Button
              action={this.handleFormSubmit}
              type={"primary"}
              title={"Submit"}
              style={buttonStyle}
            />
            {/* Submit */}
          </fieldset>
        </form>
      </div>
    );
  }
}
const buttonStyle = {
  margin: "10px"
};
export default FormContainer;