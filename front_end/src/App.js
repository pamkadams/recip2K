import React from "react";
import FormContainer from "./components/FormContainer";
import "./App.css";
import RecipeFile from "./Recipefile.js";

function App() {
  return (
    <div className="App">
      <RecipeFile title="PDF test" />
      <FormContainer />
    </div>
  );
}

export default App;
