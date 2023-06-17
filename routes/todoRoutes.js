const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// Index
//TODO
router.get("/", todoController.getTodoList);

// New
router.get("/new", todoController.newTodo);

// Create
router.post("/", todoController.createTodo);

// Delete
router.delete("/:id", todoController.deleteTodo);

// Edit
router.get("/:id/edit", todoController.editTodo);

//Update
router.put("/:id", todoController.updateTodo);

// Show
//TODO
router.get("/:id", todoController.showTodo);

module.exports = router;
