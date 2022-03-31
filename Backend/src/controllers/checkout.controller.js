const express = require("express");
const router = express.Router();

const Checkout = require("../models/checkout.model.js");

router.post("", async (req, res) => {
    try {
        console.log(req.body);
        const checkout = await Checkout.create(req.body);
        return res.status(200).redirect("http://127.0.0.1:5500/GitHub/Cult.fit-Clone/payment.html");
        // return res.status(500).send(checkout)
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
