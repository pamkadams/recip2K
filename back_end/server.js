//DEPENDENCIES
const express = require("express");
const app = express();
const cors = require("cors");
const favicon = require("serve-favicon");
const path = require("path");
const port = process.env.PORT || 3003;

const mongoose = require("mongoose");
const recipesController = require("./controllers/recipes.js");

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3003",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3003"
];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };

//middleware

app.use(function(req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
    return res.sendStatus(204);
  }

  return next();
});
app.use(cors()); //all routes are exposed

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use("/recipes", recipesController);
//Listen
app.listen(port, () => {
  console.log(`London Calling on  ${port}!`);
});
