const Todo = require("../models/todo");

exports.getTodoList = async (req, res) => {
  try {
    const todoList = await Todo.find({});
    res.json(todoList);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
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

exports.updateTodo = async (req, res) => {
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