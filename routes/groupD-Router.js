const express = require("express");
const ContactModel = require("../models/Contact");
const GroupDModel = require("../models/GroupD");
const router = express.Router();

//  todo
router.post("/", async (req, res) => {
  const { name, mobile, address, aadhar, salary } = req.body;
  // console.log(req.body);
  try {
    // Check if a GroupD with the same mobile number already exists
    const existingGroupD = await GroupDModel.findOne({ mobile: mobile });

    if (existingGroupD) {
      return res.status(400).json("Mobile number already exists");
    }

    // Create a new GroupDModel instance
    const newGroupDModel = new GroupDModel({
      name,
      mobile,
      address,
      aadhar,
      salary,
    });

    // Save the new GroupDModel instance
    await newGroupDModel.save();

    return res.status(201).json("Group D Created Successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const getGroupDModel = await GroupDModel.find({});
    return res.status(201).json(getGroupDModel);
  } catch (error) {}
});
router.put("/:id", async (req, res) => {
  try {
    const updateContact = await GroupDModel.findByIdAndUpDate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res
      .status(201)
      .json({ msg: "contact update Sucessfully", updateContact });
  } catch (error) {}
});
router.delete("/:id", async (req, res) => {
  try {
    await GroupDModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("Contact Deleted Successfully");
  } catch (error) {}
});
module.exports = router;
