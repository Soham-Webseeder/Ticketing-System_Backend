
import Ticket from "../models/TicketModel.js";


export const createTicket=async(req,res)=>{
    try{
const {title,description,status,priority,project}=req.body;

const existingTicket=await Ticket.findOne({title});

if(existingTicket){
    return res.status(400).json({message:"Ticket already exist"});
}

await Ticket.create({
    title,description,status,priority,project, createdBy: req.user.role,
  creator: req.user.id
})

await Project.findByIdAndUpdate(project, {
  $push: { ticket: newTicket._id }
});

return res.status(201).json({message:"Ticket created"})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const getTickets=async(req,res)=>{
    try{
const tickets=await Ticket.find()
 .populate("project")
      .populate("assignedTo")
      .populate("creator");;

if(tickets.length===0){
    return res.status(404).json({message:"Tickets not created yet"});
}

return res.status(200).json(tickets);
    }catch(err){
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const getTicket=async(req,res)=>{
    try{
const {id}=req.params;

const ticket=await Ticket.findById(id)
.populate("project")
      .populate("assignedTo")
      .populate("creator");

if(!ticket){
return res.status(404).json({message:"Ticket not found"});
}

return res.status(200).json(ticket);
    }catch(err){
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (req.user.role === "client" && ticket.creator.toString() !== req.user.id) {
  return res.status(403).json({ message: "Not allowed" });
}
    
    const allowedFields = ["title", "description", "status", "priority"];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        ticket[field] = req.body[field];
      }
    });

    await ticket.save();

    return res.status(200).json({
      message: "Ticket updated",
      ticket, 
    });

  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteTicket=async(req,res)=>{
    try{
const {id}=req.params;

const ticket=await Ticket.findById(id);

if(!ticket){
    return res.status(404).json({message:"Ticket not found"});
}

await Project.findByIdAndUpdate(ticket.project, {
  $pull: { ticket: ticket._id }
});


await ticket.deleteOne(); 
return res.status(200).json({message:"Ticket deleted successfully"});
    }catch(err){
        return res.status(500).json({message:"Something went wrong"});
    }
}