const User = require("../models/User");
const JWT = require("jsonwebtoken");
const bycrypt = require("bcrypt");

//  ? REGISTER A  NEW USER
const registerController = async (req, res) => {
  try {
    const { name, email, mobile, password, address } = req.body;

    if (!name) {
      return res.status(500).send({
        success: false,
        message: " Name is Required",
      });
    }
    if (!email) {
      return res.status(500).send({
        success: false,
        message: " Email is Required",
      });
    }
    if (!mobile) {
      return res.status(500).send({
        success: false,
        message: "Mobile is Empty",
      });
    }
    if (!password) {
      return res.status(500).send({
        success: false,
        message: "password is Empty",
      });
    }
    if (!address) {
      return res.status(500).send({
        success: false,
        message: "Address is Empty",
      });
    }
    const exsistingUser = await User.findOne({ name });
    if (exsistingUser) {
      return res.status(500).send({
        success: false,
        message: "User  Already Exsist",
      });
    }

    // hash pasword
    // const hash = hashPassword(password);
    const genSalt = await bycrypt.genSalt(10);
    const hashPassword = await bycrypt.hash(password, genSalt);
    const newUser = new User({
      name,
      email,
      mobile,
      password: hashPassword,
      address,
    });
    const savedUser = await newUser.save();
    // console.log(savedUser);
    return res.status(200).send({
      success: true,
      message: "Account Created Succesfully Please Login!",
      savedUser,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
      message: "Error Occured Due To Some Error",
    });
  }
};

// todo login
const loginController = async (req, res) => {
  try {
    const { name, password } = req.body;
    // console.log(name, password);
    // console.log(mobile, password);
    if (!name) {
      return res.status(500).send({
        success: false,
        message: " Name is Empty",
      });
    }

    if (!password) {
      return res.status(500).send({
        success: false,
        message: "Password is Empty",
      });
    }
    // console.log(userName);
    const user = await User.findOne({ name });
    // console.log(user);
    // console.log(user);
    // console.log(user);
    // console.log(registerUser);
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User  Does not Exsist",
      });
    }
    const exsistPassword = await bycrypt.compare(password, user.password);
    if (!exsistPassword) {
      return res.status(500).send({
        success: false,
        message: "Wrong Name Or Password",
      });
    }

    // todo undefined password
    // ? TOKEN
    const token = JWT.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    // console.log(token);
    // console.log(token);
    // const { isPassword, isAdmin, ...others } = user._doc;
    user.password = undefined;
    // user.isAdmin = null;
    // const { isAdmin, ...others } = user._doc;
    res.status(200).send({
      success: true,

      // ...others,
      user,
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error",
      error,
    });
  }
};

//  todo get all user
const getUser = async (req, res) => {
  try {
    const getAllUser = await User.find({});
    res.status(200).json(getAllUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
// todo get one user
const getOneUser = async (req, res) => {
  try {
    const getOneUser = await User.findOne(req.params.id);
    res.status(200).json(getOneUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
const upDateUser = async (req, res) => {
  try {
    const userUpDate = await User.findByIdAndUpdate(req.params.id);
    res.status(200).json(userUpDate);
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user Deleted Succesfuuly");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  loginController,
  registerController,
  getUser,
  getOneUser,
  upDateUser,
  deleteUser,
};
