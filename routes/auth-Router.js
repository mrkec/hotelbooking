const router = require("express").Router();
const controller = require("../controllers/authController");
const { verifyToken, verifyUser } = require("../utlis/verfyAuth");
const {
  loginController,
  registerController,
  getUser,
  getOneUser,
  upDateUser,
  deleteUser,
} = controller;

// todo create a new user || POST
router.post("/register", registerController);

//  ? to get all user

// ! login a user//post

router.post("/login", loginController);
router.get("/getuser", getUser);
router.get("/getoneuser/:id", getOneUser);
router.put("/updateuser/:id", upDateUser);
router.delete("/deleteuser/:id", deleteUser);

// router.get("/checked", verifyToken, verifyUser, (req, res, next) => {
//   res.json("hello user user are logged in");
// });

module.exports = router;
