const express = require("express");
const router = express.Router();

const User = require("../models/user.model.js");


router.post("", async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.create(req.body);
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get("", async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});


router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});


router.patch("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;