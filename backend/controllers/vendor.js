const { StatusCodes } = require("http-status-codes");
const Vendor = require("../models/Vendor");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const vendor = await Vendor.create(req.body);
  const token = vendor.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ vendor: { name: vendor.name }, token });
};

const login = async (req, res) => {
  const { email, password, location } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const vendor = await Vendor.findOne({ email });

  if (!vendor) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isCorrect = await vendor.comparePassword(password);

  if (!isCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = vendor.createJWT();
  res.status(StatusCodes.OK).json({ vendor: { name: vendor.name }, token });
};

module.exports = {
  login,
  register,
};
