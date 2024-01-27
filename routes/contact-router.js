const express = require("express");
const ContactModel = require("../models/Contact");
const router = express.Router();

//  todo
router.post("/", async (req, res) => {
  const { name, mobile, address, pinCode, about, privacyPolicy } = req.body;
  console.log(res.body);
  try {
    const exname = await ContactModel.findOne({ name: name });
    if (exname) {
      return res.status(400).json("Name exsistAlready");
    }
    const newContact = await new ContactModel({
      name,
      mobile,
      address,
      pinCode,
      about,
      privacyPolicy,
    });
    await newContact.save();
    return res.status(201).json("Contact Created Succesfully");
  } catch (error) {}
});
router.get("/", async (req, res) => {
  try {
    const getContact = await ContactModel.find({});
    return res.status(201).json(getContact);
  } catch (error) {}
});
router.put("/:id", async (req, res) => {
  try {
    const updateContact = await ContactModel.findByIdAndUpDate(
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
    await ContactModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("Contact Deleted Successfully");
  } catch (error) {}
});

module.exports = router;
