//project routes
const express = require('express');
const router = express.Router();
//import from controllers
const { createProject , projectById , getProjectById , getAllProjects , updateProject , deleteProject  } = require('../controllers/project');
//import middleware
const { tokenMiddleware } = require('../middleware/tokenMiddleware');
const { isAuth , isAdmin } = require('../controllers/auth');
const {userById} = require('../controllers/user');

// create projectBy id router  
router.param('projectId',projectById)

router.param('userId',userById)

// get project by id router
router.get('/project/:projectId',tokenMiddleware, getProjectById)
// create project router
router.post('/project/create/:userId',tokenMiddleware,isAuth, isAdmin, createProject)
//update project
router.put('/project/:projectId/:userId',tokenMiddleware,isAuth, isAdmin, updateProject)
//delete project
router.delete('/project/:projectId/:userId',tokenMiddleware,isAuth, isAdmin, deleteProject)
//get all Projects
router.get('/projects/:userId', tokenMiddleware,isAuth, isAdmin, getAllProjects)

module.exports = router;