const express=require("express");
const { getDeveloper, createDeveloper, updateDeveloper, deleteDeveloper } = require("../controllers/developerController");

const router=express.Router();


router.get("/",getDeveloper);
router.post("/",createDeveloper);
router.put("/:id",updateDeveloper);
router.delete("/:id",deleteDeveloper);

module.exports = router;