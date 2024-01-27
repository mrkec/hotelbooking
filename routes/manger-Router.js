const express = require("express");
const MangerModel = require("../models/Manger");
const router = express.Router();

//  todo
router.post("/", async (req, res) => {
  const { name, mobile, address, aadhar, salary } = req.body;
  console.log(req.body);
  try {
    // Check if a GroupD with the same mobile number already exists
    const existingManger = await MangerModel.findOne({ mobile: mobile });

    if (existingManger) {
      return res.status(400).json("Mobile number already exists");
    }

    // Create a new GroupDModel instance
    const newMangerDModel = new MangerModel({
      name,
      mobile,
      address,
      aadhar,
      salary,
    });

    // Save the new GroupDModel instance
    await newMangerDModel.save();

    return res.status(201).json("Manger Added  Created Successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const getManger = await MangerModel.find({});
    return res.status(201).json(getManger);
  } catch (error) {}
});
router.put("/:id", async (req, res) => {
  try {
    const UpdateManger = await MangerModel.findByIdAndUpDate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res
      .status(201)
      .json({ msg: "contact update Sucessfully", UpdateManger });
  } catch (error) {}
});
router.delete("/:id", async (req, res) => {
  try {
    await MangerModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("Manger Deleted Successfully");
  } catch (error) {}
});
module.exports = router;
