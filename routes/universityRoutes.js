const express=require("express");
const router=express.Router();
const universityController=require('../controller/universityController')

router.get('/get_universities',universityController.getUniversities);
router.post('/add_universities', universityController.addUniversity)

module.exports=router;