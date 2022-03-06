// Model
const User = require("../models/user");

// Library

// Utils
const customError = require("../utils/customError");

// Creating a new user - signup
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Checking all the fields are present
  if (!name || !email || !password) {
    return customError(res, 400, "Name, email and password are required");
  }

  try {
    // Checking user already exist or not
    const isUserExit = await User.findOne({ email });
    if (isUserExit !== null) {
      return customError(res, 401, "User already exists, please login");
    }

    // Creating new user
    await User.create({
      name,
      email,
      password,
    });

    res.json({
      status: "success",
      message: "User created successfully",
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Logging a user - sign in
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Checking all the fields are present
  if (!email || !password) {
    return customError(res, 400, "Email and password are required");
  }

  try {
    const user = await User.findOne({ email });

    // Checking is valid email
    if (!user) {
      return customError(res, 401, "Either email or password is incorrect");
    }

    const isPasswordMatch = await user.isValidPassword(password);
    if (!isPasswordMatch) {
      return customError(res, 401, "Either email or password is incorrect");
    }

    // Valid user, creating jwt token valid for 2days
    const token = await user.getJwtLoginToken();

    // Sending response
    res.json({
      status: "success",
      token,
      user,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Logged in user can logout
exports.logout = async (req, res) => {
  try {
    res.json({
      status: "success",
      message: "User logged out successfully",
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};
