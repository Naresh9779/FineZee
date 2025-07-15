const express = require("express");
const authController = require("../controller/authController");
const studentController = require("../controller/studentController");
const factory = require("../controller/factoryController");
const Student = require("../models/studentModel");
const router = express.Router();

router.get(
  "/get_students",
  authController.protect,
  authController.restrictTo("admin"),
  studentController.getAllStudents,
);
router.delete(
  "/delete_student/:id",
  authController.protect,
  authController.restrictTo("admin"),
  factory.deleteOne(Student),
);
router.get(
  "/get_student/:id",
  authController.protect,
  authController.restrictTo("admin"),
  factory.getOne(Student),
);
router.patch(
  "/update_student/:id",
  authController.protect,
  authController.restrictTo("admin"),
  factory.updateOne(Student),
);

module.exports = router;
