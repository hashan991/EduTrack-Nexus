const { z } = require("zod");

const createStudentSchema = z.object({
  studentId: z.string().trim().min(1, "Student ID is required").toUpperCase(),

  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name cannot exceed 50 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name cannot exceed 50 characters"),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .toLowerCase(),

  phone: z
    .string()
    .trim()
    .min(7, "Phone number must be at least 7 characters long")
    .max(15, "Phone number cannot exceed 15 characters"),

  course: z
    .string()
    .trim()
    .min(2, "Course must be at least 2 characters long")
    .max(100, "Course cannot exceed 100 characters"),

  year: z
    .number({
      required_error: "Year is required",
      invalid_type_error: "Year must be a number",
    })
    .min(1, "Year must be at least 1")
    .max(4, "Year cannot exceed 4"),

  status: z.enum(["active", "inactive", "graduated", "suspended"]).optional(),
});

const updateStudentSchema = z.object({
  studentId: z
    .string()
    .trim()
    .min(1, "Student ID is required")
    .toUpperCase()
    .optional(),

  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name cannot exceed 50 characters")
    .optional(),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name cannot exceed 50 characters")
    .optional(),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .toLowerCase()
    .optional(),

  phone: z
    .string()
    .trim()
    .min(7, "Phone number must be at least 7 characters long")
    .max(15, "Phone number cannot exceed 15 characters")
    .optional(),

  course: z
    .string()
    .trim()
    .min(2, "Course must be at least 2 characters long")
    .max(100, "Course cannot exceed 100 characters")
    .optional(),

  year: z
    .number({
      invalid_type_error: "Year must be a number",
    })
    .min(1, "Year must be at least 1")
    .max(4, "Year cannot exceed 4")
    .optional(),

  status: z.enum(["active", "inactive", "graduated", "suspended"]).optional(),
});

module.exports = {
  createStudentSchema,
  updateStudentSchema,
};
