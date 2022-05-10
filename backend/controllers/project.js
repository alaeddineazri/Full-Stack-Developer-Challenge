//project Controller
const Project = require('../models/project');
const { errorHandler } = require("../helpers/dbErrHandler");



//create project
exports.createProject = (req, res) => {
    const project = new Project(req.body);
    project.save((err, project) => {
        if (err) {
            console.log(project)
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json({ project });
    });
}

// project by id
exports.projectById = (req, res, next, id) => {
    Project.findById(id).exec((err, project) => {
        if (err || !project) {
            return res.status(400).json({
                error: "project not found"
            });
        }
        req.project = project;
        next();
    });
}


//get project by id
exports.getProjectById = (req, res) => {
    return res.json(req.project);
}

// update project

exports.updateProject = (req, res) => {
    const project = req.project;
    project.title = req.body.title;
    project.description = req.body.description;
    project.category = req.body.category;
    project.adminList= req.body.adminList;
    project.usersList= req.body.usersList;
    project.status= req.body.status;
    project.save((err, updatedProject) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to update project"
            });
        }
        res.json(updatedProject);
    });
}




//delete project
exports.deleteProject = (req, res) => {
    const project = req.project;
    project.remove((err, project) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to delete project"
            });
        }
        res.json({
            message: "project deleted successfully"
        });
    });
}

//get all projects
exports.getAllProjects = (req, res) => {
    Project.find().exec((err, project) => {
        if (err) {
            return res.status(400).json({
                error: "No project found"
            });
        }
        res.json(project);
    });
}



