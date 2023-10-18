const asyncHandler = require("express-async-handler");
const todoModel = require("../models/todoModel");

// GET
// To Do List
exports.todoList = asyncHandler(async (req, res) => {
  const todoListItem = await todoModel.find();
  if (todoListItem.length === 0) {
    res.status(404);
    throw new Error("No To Do items Found");
  }
  res.status(200).json(todoListItem);
});

// POST
// CREATE To Do
exports.createToDo = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(404);
    throw new Error("Please fill all the fields");
  }

  const todo = await todoModel.create({
    text,
  });

  res.status(201).json({ message: "To Do created successfully", todo });
});

// PUT
// Update To Do
exports.updateToDo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const newToDo = await todoModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({ message: "To Do updated successfully", newToDo });
});

// DELETE
// DELETE To Do
exports.deleteToDo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todoItem = await todoModel.findByIdAndDelete(id);
  if (!todoItem) {
    res.status(404);
    throw new Error("No to do item Found");
  }

  res.status(200).json({ message: "To Do Deleted Successfully" });
});
