const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../services/student.service");

const { sendSuccess, sendError } = require("../utils/apiResponse");

const createStudentController = async (req, res) => {
  try {
    const student = await createStudent(req.body, req.user._id);

    return sendSuccess(res, 201, "Student created successfully", student);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to create student",
    );
  }
};

const getAllStudentsController = async (req, res) => {
  try {
    const students = await getAllStudents();

    return sendSuccess(res, 200, "Students fetched successfully", students);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to fetch students",
    );
  }
};

const getStudentByIdController = async (req, res) => {
  try {
    const student = await getStudentById(req.params.id);

    return sendSuccess(res, 200, "Student fetched successfully", student);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to fetch student",
    );
  }
};

const updateStudentController = async (req, res) => {
  try {
    const student = await updateStudent(req.params.id, req.body);

    return sendSuccess(res, 200, "Student updated successfully", student);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to update student",
    );
  }
};

const deleteStudentController = async (req, res) => {
  try {
    const student = await deleteStudent(req.params.id);

    return sendSuccess(res, 200, "Student deleted successfully", student);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to delete student",
    );
  }
};

module.exports = {
  createStudentController,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,
};
