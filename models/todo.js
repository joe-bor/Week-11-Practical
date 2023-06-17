const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true, // takes out whitespace on both ends of the input
  },
  description: {
    type: String,
    trim: true,
  },
  when: {
    type: String,
    enum: ["Today", "This Week", "This Month"],
    default: "Today",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

// Capitalizes the first letter of the todo's title ( for no reason )
todoSchema.pre("save", function (next) {
  let words = this.title.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  this.title = words.join(" ");
  next();
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
