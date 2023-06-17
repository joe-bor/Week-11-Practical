const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// Index
router.get("/", todoController.getTodoList);

// New
//TODO: form for creating
router.get("/new", todoController.newTodo);

// Create
router.post("/", todoController.createTodo);

// Delete
router.delete("/:id", todoController.deleteTodo);

// Edit
//TODO: form for editing

//Update
router.put("/:id", todoController.updateTodo);

// Show
router.get("/:id", todoController.showTodo);

module.exports = router;
