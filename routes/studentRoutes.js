const express=require('express');
const authController=require('../controller/authController')
const studentController=require('../controller/studentController')
const router=express.Router();





router.post('/signup',authController.signUp);
router.post('/login',authController.login);
router.get('/logout',authController.logout);

// router.post('/forgotPassword',authController.forgotPassword);
// router.patch('/resetPassword/:token',authController.resetPassword);

router.get('/get_students',authController.protect,studentController.getStudents)
router.patch('/update_password/:id',authController.updatePassword);
module.exports=router;