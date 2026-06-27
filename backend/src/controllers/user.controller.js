const { sendSuccess } = require("../utils/apiResponse");

const getMe = async (req, res) => {
  const user = req.user;

  return sendSuccess(res, 200, "User profile fetched successfully", {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
};

module.exports = {
  getMe,
};
