const express = require("express");
const stripe = require("stripe")(
  "sk_test_51OaJpHSJxgHJ9uK3Pr7fw20BkmcBFDQEHHdEKodPiQ4C2h6z0suJXi2LL8BDbtUxfkPN4ZYERiBXg63GA9Uuu5Uk00hkAWL6R4"
);

const router = express.Router();

//  todo create a payments intent

router.post("/intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: "INR",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.json({
      paymentIntent: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
