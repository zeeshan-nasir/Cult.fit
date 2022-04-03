const express = require("express");
const router = express.Router();

const User = require("../models/user.model.js");

const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create token for session

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY);
}

router.post("", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).send({ message: 'Wrong Email or Password' });
        }

        const match = user.checkPassword(req.body.password);

        if (!match) {
            return res.status(400).send({ message: 'Wrong Email or Password' });
        }

        const token = generateToken(user);

        if (user.role == "customer") {
            res.cookie('token', token, { httpOnly: false }).redirect("views/eat.html");
        }
        else {
            res.cookie('token', token, { httpOnly: false }).redirect("views/eat-admin.html");
        }
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;