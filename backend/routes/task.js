//project routes
const express = require('express');
const router = express.Router();
//import from controllers
const { createTask , taskById , getTaskById , getAllTasks , updateTask , deleteTask, getTasksByProject  } = require('../controllers/task');
// //import middleware
const { tokenMiddleware } = require('../middleware/tokenMiddleware');
const { isAuth, isAdmin  } = require('../controllers/auth');
const {userById} = require('../controllers/user');
const { projectById } = require('../controllers/project');

// create taskBy id router  
router.param('taskId',taskById)

router.param('userId',userById)
router.param('projectId',projectById )

// get task by id router
router.get('/task/:taskId', getTaskById)
// create tasks router
//only admin can create tasks
router.post('/task/create/:userId',tokenMiddleware ,isAuth,isAdmin,  createTask)
//update tasks
router.put('/task/:taskId/:userId',tokenMiddleware,isAuth, updateTask)
//delete task
//only admin can delete task
router.delete('/task/:taskId/:userId',tokenMiddleware,isAuth, isAdmin, deleteTask)
//get all tasks
router.get('/tasks', getAllTasks)


module.exports = router;