const express =require("express")
const authController=require("../controller/authController")

router.get('/get_students',authController.protect,authController.restrictTo('admin'),studentController.)