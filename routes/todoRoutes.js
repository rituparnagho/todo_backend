const router = require("express").Router();
// Controllers
const {
  todoList,
  createToDo,
  updateToDo,
  deleteToDo,
} = require("../controllers/todoController");
const auth = require("../middleware/auth");

// GET
// All TO DO LIST
router.route("/list").get(auth, todoList);

// POST
// CREATE TO DO
router.route("/create").post(auth, createToDo);

// PUT
// UPDATE TO DO
router.route("/update/:id").put(auth, updateToDo);

// DELETE
// DELETE TO DO
router.route("/delete/:id").delete(auth, deleteToDo);

module.exports = router;
