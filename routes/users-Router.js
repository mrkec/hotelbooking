const User = require("../models/User");
const { verifyToken, verifyUser, isAdmin } = require("../utlis/verfyAuth");
const router = require("express").Router();

// CREATE
// router.get("/checkedtoken", verifyToken, (req, res) => {
//   res.json("hello user are logged in");
// });
// router.get("/test-route", (req, res) => {
//   const token = req.headers.authorization;
//   console.log(token);
//   res.send("Check console for token");
// });
// router.get("/checkeduser/:id", verifyUser, (req, res) => {
//   res.json("hello user are you can delted your account");
// });
// router.get("/checked/:id", isAdmin, (req, res) => {
//   res.json("hello admin");
// });

// UPDATE
router.put("/:id", verifyUser, async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    //   const saveUser = await newUser.save();
    return res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET ALL
router.get("/", isAdmin, async (req, res) => {
  try {
    const Users = await User.find();
    //   const saveUser = await newUser.save();
    return res.status(201).json(Users);
  } catch (error) {
    res.status(500).json(error);
  }
});
// DELETE
router.delete("/:id", verifyUser, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    //   const saveUser = await newUser.save();
    return res.status(201).json("User Delted Sucessfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET ONE
router.get("/:id", verifyUser, async (req, res) => {
  try {
    const User = await User.findById(req.params.id);
    return res.status(201).json(User);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
