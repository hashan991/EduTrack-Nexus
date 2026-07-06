const express = require("express");

const {
  createStudentController,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,
} = require("../controllers/student.controller");

const { protect } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createStudentSchema,
  updateStudentSchema,
} = require("../validations/student.validation");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(getAllStudentsController)
  .post(validate(createStudentSchema), createStudentController);

router
  .route("/:id")
  .get(getStudentByIdController)
  .put(validate(updateStudentSchema), updateStudentController)
  .delete(deleteStudentController);

module.exports = router;
