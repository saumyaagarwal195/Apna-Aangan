//if you want to include payment try stripe
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "Indian Rupee",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          return res.status(500).json(stripeErr);
        } else {
          return res.status(200).json(stripeRes);
        }
      }
    );
  });


module.exports =router;