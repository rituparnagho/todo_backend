const Auth = require("../models/authModel");
const asyncHandler = require("express-async-handler");

// POST
// Register User
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const existUser = await Auth.findOne({ email });
  if (existUser) {
    res.status(401);
    throw new Error("email already exist");
  }
  const user = await Auth.create({
    name,
    email,
    password,
  });
  res.status(200).json({ user });
});

// POST
// Login User
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401);
    throw new Error("please enter email and password");
  }

  const user = await Auth.findOne({ email }).select("+password");
  if (!user) {
    res.status(401);
    throw new Error("invalid email or password");
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    res.status(401);
    throw new Error("password doesn't match");
  }
  const token = user.getJWTToken();
  res.status(200).cookie("token", token).json({ user, token });
});
