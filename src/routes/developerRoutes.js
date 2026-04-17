const express=require("express");
const { getDeveloper, createDeveloper, updateDeveloper, deleteDeveloper, getSingleDeveloper } = require("../controllers/developerController");

const router=express.Router();

router.get("/get-all-developers",getDeveloper);
router.post("/create-developer",createDeveloper);
router.put("/update-developer/:id",updateDeveloper);
router.delete("/delete-developer/:id",deleteDeveloper);
router.get("/get-single-developer/:id",getSingleDeveloper);

module.exports = router;