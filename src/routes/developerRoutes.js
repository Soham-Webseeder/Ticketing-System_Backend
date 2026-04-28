const express=require("express");
const { getDeveloper, createDeveloper, updateDeveloper, deleteDeveloper, getSingleDeveloper } = require("../controllers/developerController");
const { verifyToken } = require("../middleware/authmiddleware");
const  {authorizeRoles}  = require("../middleware/authorizeRoles");

const router=express.Router();

router.get("/",verifyToken,authorizeRoles("admin"),getDeveloper);
router.post("/",verifyToken,authorizeRoles("admin"),createDeveloper);
router.put("/:id",verifyToken,authorizeRoles("admin","developer"),updateDeveloper);
router.delete("/:id",verifyToken,authorizeRoles("admin"),deleteDeveloper);
router.get("/:id",verifyToken,authorizeRoles("admin","developer"),getSingleDeveloper);

module.exports = router;