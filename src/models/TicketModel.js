const mongoose=require("mongoose");

const ticketSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Open","In Progress","Resolved","Closed"],
        default:"Open",
    },
    priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Low",
    },
    project:{
        type:mongoose.Types.ObjectId,
        ref:"Project",
    },
    createdBy:{
        type:String,
        enum:["admin","client"],
        required:true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      refPath: "createdBy",
    },
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "Developer",
    },
},{timestamps:true});

const Ticket=mongoose.model("Ticket",ticketSchema);

module.exports=Ticket;