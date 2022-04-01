const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require("../models/user.model.js");

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY);
};

// To register user

router.post("", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(500).send("User already exists");
        }

        user = await User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        });

        const token = generateToken(user);
        // res.status(200).send({ user, token });
        return res.status(200).redirect("views/login.html");
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});


module.exports = router;