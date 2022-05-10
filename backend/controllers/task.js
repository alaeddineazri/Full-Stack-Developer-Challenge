const { errorHandler } = require("../helpers/dbErrHandler");
const Task = require("../models/task");

//create Task
exports.createTask = (req, res) => {
  const task = new Task(req.body);
  task.save((err, task) => {
    if (err) {
      console.log(task);
      return res.status(400).json({
        error: "Not able to create task",
      });
    }
    res.json({ task });
  });
};

//crating project by id
exports.taskById = (req, res, next, id) => {
  Task.findById(id).exec((err, task) => {
    if (err || !task) {
      return res.status(400).json({
        error: "task not found",
      });
    }
    req.task = task;
    next();
  });
};

//get Task by id
exports.getTaskById = (req, res) => {
  return res.json(req.task);
};

// update task
exports.updateTask = (req, res) => {
  const task = req.task;
  task.title = req.body.title;
  task.description = req.body.description;
  task.status = req.body.status;

  task.save((err, updatedTask) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(updatedTask);
  });
};

//delete project
exports.deleteTask = (req, res) => {
  const task = req.task;
  task.remove((err, task) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to delete task",
      });
    }
    res.json({
      message: "task deleted successfully",
    });
  });
};

//get all categories
exports.getAllTasks = (req, res) => {
  Task.find().exec((err, task) => {
    if (err) {
      return res.status(400).json({
        error: "No project found",
      });
    }
    res.json(task);
  });
};

// exports.getTasksByProjectId = (req, res) => {

//     Task.find({ project: req.body.project })
//         .exec((err, task) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: "Task not found"
//                 })
//             }
//             res.json(task);
//         })
// }

