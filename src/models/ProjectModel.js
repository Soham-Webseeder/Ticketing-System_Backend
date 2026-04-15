const mongoose=require("mongoose");
const crypto=require("crypto");

const projectSchema=new mongoose.Schema({
    projectName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Active","On Hold","Completed","Cancelled"],
        default:"Active",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    apiKey: {
      type: String,
      unique: true,
    },
    client:{
        type:mongoose.Types.ObjectId,
        ref:"Client"
    },
    assignedDeveloper:{
        type:mongoose.Types.ObjectId,
        ref:"Developer"
    },
    ticket:[{
        type:mongoose.Types.ObjectId,
        ref:"Ticket",
    }]
},{timestamps:true});

projectSchema.pre("save",async function(next){
    if(!this.apiKey){
        this.apiKey=await crypto.randomBytes(16).toString("hex");
    }
    next();
})

const Project=mongoose.model("Project",projectSchema);

module.exports= Project;