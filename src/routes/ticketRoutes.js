const express=require("express");
const { getTickets, getTicket, createTicket, updateTicket, deleteTicket } = require("../controllers/ticketController");

const router=express.Router();

router.get("/",getTickets);
router.get("/:id",getTicket);
router.post("/",createTicket);
router.put("/:id",updateTicket);
router.delete("/:id",deleteTicket);

module.exports=router;