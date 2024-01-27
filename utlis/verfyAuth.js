const JWT = require("jsonwebtoken");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    // console.log(req.headers);
    // console.log(token);

    if (!token) {
      return res.status(400).json("You are not authorized!");
    }

    // const tokenParts = token.split(" ");
    // const tokenValue = tokenParts[1];

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json("Invalid token");
  }
};

// Rest of your code remains the same

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user);
    if (req.user._id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(400).json("Your are  token but not valid");
    }
  });
};
const isAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(400).json("Your are not the admin");
    }
  });
};

module.exports = { verifyToken, verifyUser, isAdmin };
