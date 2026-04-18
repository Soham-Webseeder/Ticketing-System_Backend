const express=require("express");
const { getClient, createClient, updateClient, deleteClient,singleClient } = require("../controllers/clientController.js");

const router=express.Router();

router.get("/",getClient);
router.get("/:id",singleClient);
router.post("/",createClient);
router.put("/:id",updateClient);
router.delete("/:id",deleteClient);

module.exports=router;