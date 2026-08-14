const User = require("./user.model");
const bcrypt = require("bcrypt");
const AppError = require("../../utils/AppError");

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
module.exports = {
  registerUser,
};
