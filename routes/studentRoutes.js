const express=require('express');
const authController=require('../controller/authController')
const router=express.Router();





router.post('/signup',authController.signUp);
router.post('/login',authController.login);
router.get('/logout',authController.logout);
// router.post('/forgotPassword',authController.forgotPassword);
// router.patch('/resetPassword/:token',authController.resetPassword);

module.exports=router;