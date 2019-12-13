import React from "react";
import FormContainer from "./components/FormContainer";
import "./App.css";
import RecipeFile from "./Recipefile.js";
import axios from "axios";

let baseURL = "http://localhost:3003";

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
  }
  componentDidMount() {
    this.getRecipes;
  }
  async getRecipes() {
    const response = await axios.get(`${baseURL}/recipes`);
    const recipes = response.data;

    this.setState({ recipes: recipes });
  }

  async deleteRecipe(id) {
    await axios.delete(`${baseURL}/holidays/${id}`);

    const filteredRecipes = this.state.recipes.filter(holiday => {
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
      <div className="App">
        <RecipeFile title="PDF test" />
        <FormContainer />
      </div>
    );
  }
}

export default App;
