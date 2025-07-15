const express = require("express");
const router = express.Router();
const universityController = require("../controller/universityController");
const authController = require("../controller/authController");

router.get("/get_universities", universityController.getUniversities);
router.get("/get_university/:id", universityController.getUniversity);
router.post(
  "/add_universities",
  authController.protect,
  authController.restrictTo("admin"),
  universityController.addUniversity,
);
router.put(
  "/update_university/:id",
  authController.protect,
  authController.restrictTo("admin"),
  universityController.updateUniversity,
);
router.delete(
  "/delete_university/:id",
  authController.protect,
  authController.restrictTo("admin"),
  universityController.deleteUniversity,
);

module.exports = router;
