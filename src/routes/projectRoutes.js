const express=require("express");
const {getProjects, getProject, createProject, updateProject, deleteProject}=require("../controllers/projectController");
const { verifyToken } = require("../middleware/authmiddleware");
const { authorizeRoles } = require("../middleware/authorizeRoles");
const Developer = require("../models/DeveloperModel");

const router=express.Router();

router.get("/",verifyToken,authorizeRoles("admin"),getProjects);
router.get("/:id",verifyToken,authorizeRoles("admin","client","developer"),getProject);
router.post("/",verifyToken,authorizeRoles("admin"),createProject);
router.put("/:id",verifyToken,authorizeRoles("admin","developer"),updateProject);
router.delete("/:id",verifyToken,authorizeRoles("admin"),deleteProject);

module.exports=router;