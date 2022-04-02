const express = require("express");
const router = express.Router();

const User = require("../models/user.model.js")

// To register user

router.post("", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(500).send("User already exists");
        }

        user = await User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        });

        // res.status(200).send({ user });
        return res.status(200).redirect("views/login.html");
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});


module.exports = router;