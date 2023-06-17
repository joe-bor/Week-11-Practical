const Todo = require("../models/todo");

exports.getTodoList = async (req, res) => {
  try {
    const todoList = await Todo.find({});
    res.json(todoList);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.newTodo = (req, res) => {
  res.render("todos/New");
};

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.json({ todo });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.showTodo = async (req, res) => {
  try {
    const todo = await Todo.findById({ _id: req.params.id });
    res.json(todo);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.editTodo = async (req, res) => {
  try {
    const todo = await Todo.findById({ _id: req.params.id });
    res.render("todos/Edit", {
      todo: todo,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  if (req.body.completed === "on") {
    req.body.completed = true;
  } else {
    req.body.completed = false;
  }
  try {
    const todo = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json({ todo });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete({ _id: req.params.id }).then(
      () => {
        res.json({ message: "Document Deleted" });
      }
    );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
