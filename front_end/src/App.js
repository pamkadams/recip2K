import React from "react";
import FormContainer from "./components/FormContainer";
import "./App.css";
import RecipeFile from "./Recipefile.js";
import axios from "axios";

const baseURL = "http://localhost:3003";

console.log("current base URL in App.js not FormContainer", baseURL);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      recipe: {}
    };
    this.getRecipes = this.getRecipes.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.getRecipe = this.getRecipe.bind(this);
    //this.printRecipe = this.printRecipe.bind(this);
  }
  componentDidMount() {
    this.getRecipes();
  }

  async getRecipes() {
    const response = await axios.get(`${baseURL}/recipes`);
    const recipes = response.data;

    this.setState({ recipes: recipes });
  }

  async deleteRecipe(id) {
    await axios.delete(`${baseURL}/recipes/${id}`);

    const filteredRecipes = this.state.recipes.filter(recipe => {
      return recipe._id !== id;
    });

    this.setState({
      recipes: filteredRecipes
    });
  }

  getRecipe(recipe) {
    this.setState({ recipe: recipe });
  }
  render() {
    return (
      <main>
        <div>
          <img
            id="recipe_chevron"
            src="images/recipe_chevron_orange.png"
            title="recipe icon"
            height="15%"
            width="15%"
          />
        </div>
        <table>
          <tbody>
            {this.state.recipes.map(recipe => {
              return (
                <tr onMouseOver={() => this.getRecipe(recipe)} key={recipe._id}>
                  <td>{recipe.recipeName}</td>
                  <td onClick={() => this.updateRecipe(recipe._id)}>Update</td>
                  <td onClick={() => this.printRecipe(recipe)} key={recipe._id}>
                    Print
                  </td>
                  <td onClick={() => this.deleteRecipe(recipe._id)}>Delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="App">
          <RecipeFile title="PDF test" />
          <FormContainer />
        </div>
      </main>
    );
  }
}

export default App;
