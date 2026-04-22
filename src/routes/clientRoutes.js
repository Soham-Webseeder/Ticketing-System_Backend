const express=require("express");
const { getClient, createClient, updateClient, deleteClient,singleClient } = require("../controllers/clientController.js");
const { verifyToken } = require("../middleware/authmiddleware.js");
const {authorizeRoles}=require("../middleware/authorizeRoles.js");

const router=express.Router();

router.get("/",verifyToken,
  authorizeRoles("admin"),
  getClient);

router.get("/:id",verifyToken,
  authorizeRoles("admin","client"),singleClient);

router.post("/",verifyToken,
  authorizeRoles("admin"),
  createClient
  );
router.put("/:id",verifyToken,
  authorizeRoles("admin","client"),updateClient);

router.delete("/:id",verifyToken,
  authorizeRoles("admin"),deleteClient);

module.exports=router;