//DEPENDENCIES
const express = require("express");
const app = express();
const cors = require("cors");

port = 3000;

const mongoose = require("mongoose");

//middleware
app.use(cors());
app.use(express.json());

//DB ERRORS
mongoose.connection.on("error", err =>
  console.log(err.message + "is Mongod not running?")
);
mongoose.connection.on("disconnected", err =>
  console.log(err + " mongo is disconnected")
);

//DB CONNECTION
mongoose.connect("mongodb://localhost:27017/recipes", {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose");
});

//CONTROLLERS/ROUTES
const recipesController = require("./controllers/recipes.js");
app.use("/recipes", recipesController);

//Listen
app.listen(port, () => {
  console.log(`London Calling on  ${port}!`);
});
