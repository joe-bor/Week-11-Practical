const express = require("express");
const morgan = require("morgan");
const todoRoutes = require("./routes/todoRoutes");
const app = express();
const jsxEngine = require("jsx-view-engine");
const methodOverride = require("method-override");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(morgan("dev"));
app.use("/todos", todoRoutes);
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

module.exports = app;
