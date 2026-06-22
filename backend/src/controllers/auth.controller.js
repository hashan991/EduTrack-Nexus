const { registerUser, loginUser } = require("../services/auth.service");
const { sendSuccess, sendError } = require("../utils/apiResponse");

const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);

    return sendSuccess(res, 201, "User registered successfully", result);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Registration failed",
    );
  }
};

const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);

    return sendSuccess(res, 200, "User logged in successfully", result);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Login failed",
    );
  }
};

module.exports = {
  register,
  login,
};
