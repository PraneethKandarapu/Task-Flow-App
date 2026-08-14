const userService = require("./user.service");
const registerUser = async (req, res, next) => {
  try {
    const userData = { ...req.body };

    const user = await userService.registerUser(userData);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const userData = { ...req.body };
    const { user, token } = await userService.loginUser(userData);
    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { registerUser, loginUser };
