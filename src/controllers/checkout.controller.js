const express = require("express");
const router = express.Router();

const Checkout = require("../models/checkout.model.js");

router.post("", async (req, res) => {
    try {
        const checkout = await Checkout.create(req.body);
        return res.status(200).redirect("views/payment.html");
    }
    catch (error) {
        return res.status(500).send({ err: error.message })
    }
});


router.get("", async (req, res) => {
    try {
        const checkout = await Checkout.find().lean().exec();
        return res.status(200).send(checkout)
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
});

module.exports = router;
