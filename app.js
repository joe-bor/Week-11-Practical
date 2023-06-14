const express = require("express");
const morgan = require("morgan");
const todoRoutes = require("./routes/todoRoutes");
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use("/todos", todoRoutes);

module.exports = app;
