const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    text: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("ToDo", todoSchema);
