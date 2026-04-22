const express=require("express");
const { getTickets, getTicket, createTicket, updateTicket, deleteTicket } = require("../controllers/ticketController");
const { verifyToken } = require("../middleware/authmiddleware");
const { authorizeRoles } = require("../middleware/authorizeRoles");

const router=express.Router();

router.get("/",verifyToken,authorizeRoles("admin"),getTickets);
router.get("/:id",verifyToken,authorizeRoles("admin","developer","client"),getTicket);
router.post("/",verifyToken,authorizeRoles("admin"),createTicket);
router.put("/:id",verifyToken,authorizeRoles("admin","developer","client"),updateTicket);
router.delete("/:id",verifyToken,authorizeRoles("admin"),deleteTicket);

module.exports=router;