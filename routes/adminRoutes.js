const express =require("express")
const authController=require("../controller/authController")
const studentController=require("../controller/studentController")
const router=express.Router();

router.get('/get_students',authController.protect,authController.restrictTo('admin'),studentController.getAllStudents)

module.exports=router;
