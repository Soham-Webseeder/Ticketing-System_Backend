const express=require("express");
const { getDeveloper, createDeveloper, updateDeveloper, deleteDeveloper, getSingleDeveloper } = require("../controllers/developerController");

const router=express.Router();


router.get("/",getDeveloper);
router.post("/",createDeveloper);
router.put("/:id",updateDeveloper);
router.delete("/:id",deleteDeveloper);
router.get("/:id",getSingleDeveloper);

module.exports = router;