const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const { sendError } = require("../utils/apiResponse");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, 401, "Not authorized. No token provided");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return sendError(res, 401, "Not authorized. User not found");
    }

    if (!user.isActive) {
      return sendError(res, 403, "Your account is disabled");
    }

    req.user = user;

    next();
  } catch (error) {
    return sendError(res, 401, "Not authorized. Invalid or expired token");
  }
};

module.exports = {
  protect,
};
