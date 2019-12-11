import React, { Component } from "react";
import FormContainer from "./FormContainer";
import "./App.css";
import RecipeFile from "./Recipefile.js";
import Axios from "axios";

function App() {
  return (
    <div className="App">
      <RecipeFile title="PDF test" />
      <FormContainer />
    </div>
  );
}

export default App;
