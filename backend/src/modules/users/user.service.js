const User = require("./user.model");
const bcrypt = require("bcrypt");
const AppError = require("../../utils/AppError");
const jwt = require("jsonwebtoken");
// every function must only receive and send data, not http responses
// we dont use req,res objects in service layer, thats why we use userData
const registerUser = async (userData) => {
  // find user from the db
  const existingUser = await User.findOne({
    email: userData.email,
  });

  //if user exists throw an error using AppError
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  //   store the user in db
  const user = await User.create({
    //using spread operator
    ...userData,
    password: hashedPassword, //replace the password in hashedPassword
  });
  // exclude password and store remaining details to "safeUser"
  // we dont need to send password back as a response
  const { password, ...safeUser } = user.toObject();
  return safeUser;
};

const loginUser = async (userData) => {
  const findUser = await User.findOne({
    email: userData.email,
  });
  if (!findUser) {
    throw new AppError("invalid email or password", 401);
  }
  const isPasswordCorrect = await bcrypt.compare(
    userData.password,
    findUser.password,
  );
  if (!isPasswordCorrect) {
    throw new AppError("invalid email or password", 401);
  }
  const token = jwt.sign({ userId: findUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d", //expires in 1 day
  });
  const { password, ...safeUser } = findUser.toObject();
  return {
    user: safeUser,
    token,
  };
};
module.exports = {
  registerUser,
  loginUser,
};
