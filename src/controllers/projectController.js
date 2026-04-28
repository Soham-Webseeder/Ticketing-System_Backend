const Project=require("../models/ProjectModel.js");
const mongoose=require("mongoose");
const Client=require("../models/ClientModel.js");
const Developer=require("../models/DeveloperModel.js");

const createProject=async(req,res)=>{
    try{
const {projectName,description,startDate,endDate,status,client,assignedDeveloper}=req.body;



if (!mongoose.Types.ObjectId.isValid(client)) {
  return res.status(400).json({ message: "Invalid client ID" });
}

if (!mongoose.Types.ObjectId.isValid(assignedDeveloper)) {
  return res.status(400).json({ message: "Invalid developer ID" });
}

const existingProject = await Project.findOne({ projectName });

if (existingProject) {
  return res.status(400).json({ message: "Project already exists" });
}

const existingClient=await Client.findById(client);

if(!existingClient){
    return res.status(404).json({message:"Client not found"})
}

const developer=await Developer.findById(assignedDeveloper);

if(!developer){
    return res.status(404).json({message:"developer not found"});
}
await Project.create({
    projectName,description,startDate,endDate,status,client,assignedDeveloper
});

return res.status(201).json({message:"Project Created"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Something went wrong"});
    }
}

const getProjects=async(req,res)=>{
    try{
const projects = await Project.find({})
      .populate("client")
      .populate("assignedDeveloper");

if(projects.length===0){
    return res.status(404).json({message:"Projects not created yet"});
}
return res.status(200).json(projects);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Something went wrong"});
    }
}

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const allowedFields = ["projectName","description","status","startDate","endDate"];

allowedFields.forEach(field => {
  if (req.body[field] !== undefined) {
    project[field] = req.body[field];
  }
});

    Object.assign(project);

    await project.save();

    return res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};


const getProject=async(req,res)=>{
    try{
const {id}=req.params;

const project = await Project.findById(id)
      .populate("client")
      .populate("assignedDeveloper");

if(!project){
    return res.status(404).json({message:"Project not found"});
}

return res.status(200).json(project);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Something went wrong"});
    }
}

const deleteProject=async(req,res)=>{
    try{
        const {id}=req.params;
        const project=await Project.findById(id);

        if(!project){
            return res.status(404).json({message:"Project not found"});
        }

        await project.deleteOne();

        return res.status(200).json({message:"Project deleted successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Something went wrong"});
    }
}

module.exports={deleteProject,createProject,updateProject,getProject,getProjects};