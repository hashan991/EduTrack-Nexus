const Student = require("../models/student.model");

const createStudent = async (studentData, userId) => {
  const existingStudent = await Student.findOne({
    $or: [{ studentId: studentData.studentId }, { email: studentData.email }],
  });

  if (existingStudent) {
    const error = new Error("Student ID or email already exists");
    error.statusCode = 409;
    throw error;
  }

  const student = await Student.create({
    ...studentData,
    createdBy: userId,
  });

  return student;
};

const getAllStudents = async () => {
  const students = await Student.find()
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  return students;
};

const getStudentById = async (studentId) => {
  const student = await Student.findById(studentId).populate(
    "createdBy",
    "name email",
  );

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  return student;
};

const updateStudent = async (studentId, updateData) => {
  const student = await Student.findById(studentId);

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  if (updateData.studentId || updateData.email) {
    const duplicateStudent = await Student.findOne({
      _id: { $ne: studentId },
      $or: [{ studentId: updateData.studentId }, { email: updateData.email }],
    });

    if (duplicateStudent) {
      const error = new Error("Student ID or email already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    studentId,
    updateData,
    {
      new: true,
      runValidators: true,
    },
  ).populate("createdBy", "name email");

  return updatedStudent;
};

const deleteStudent = async (studentId) => {
  const student = await Student.findById(studentId);

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  await Student.findByIdAndDelete(studentId);

  return student;
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
