//DEPENDENCIES
const express = require("express");
const app = express();
const cors = require("cors");

port = 3003;

const mongoose = require("mongoose");
const recipesController = require("./controllers/recipes.js");

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === "/favicon.ico") {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
}

const whitelist = ["http://localhost:3000", "http://localhost:3003"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

//middleware
app.use(ignoreFavicon);
app.use(cors(corsOptions)); //all routes are exposed
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/recipes", recipesController);
// //DB ERRORS
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

//Listen
app.listen(port, () => {
  console.log(`London Calling on  ${port}!`);
});
