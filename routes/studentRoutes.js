const express = require("express");
const authController = require("../controller/authController");
const studentController = require("../controller/studentController");
const router = express.Router();

router.post("/signup", authController.signUp);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

// router.post('/forgotPassword',authController.forgotPassword);
// router.patch('/resetPassword/:token',authController.resetPassword);

//Profile
router.get(
  "/get_profile",
  authController.protect,
  studentController.getMe,
  studentController.getStudent,
);

router.patch(
  "/update_profile",
  authController.protect,
  studentController.updateStudent,
);

router.patch(
  "/update_password",
  authController.protect,
  authController.updatePassword,
);

//BOOKMARK
router.get(
  "/get_bookmarked_universities",
  authController.protect,
  studentController.getBookmarkedUniversities,
);

router.post(
  "/toggle_bookmark_university",
  authController.protect,
  studentController.toggleBookmarkUniversity,
);

module.exports = router;
