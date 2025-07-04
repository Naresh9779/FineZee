const express=require("express");
const router=express.Router();
const universityController=require('../controller/universityController')

router.get('/get_universities',universityController.getUniversities);
router.post('/add_universities', universityController.addUniversity)
router.put('/update_university/:id', universityController.updateUniversity);


module.exports=router;