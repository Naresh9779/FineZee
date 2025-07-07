const express =require("express")
const authController=require("../controller/authController")
const studentController=require("../controller/studentController")
const factory=require("../controller/factoryController")
const router=express.Router();

router.get('/get_students',authController.protect,authController.restrictTo('admin'),studentController.getAllStudents);
router.delete('/delete_student/:id',authController.protect,authController.restrictTo('admin'),factory.deleteOne);
router.get('/get_student/:id',authController.protect,authController.restrictTo('admin'),factory.getOne);
router.patch('/update_student/:id',authController.protect,authController.restrictTo('admin'),factory.updateOne);

module.exports=router;
