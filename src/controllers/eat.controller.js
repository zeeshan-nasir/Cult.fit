const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authentication.js");
const authorise = require("../middlewares/authorise.js");

const Eat = require("../models/eat.model.js");


router.post("", async (req, res) => {
    try {
        const eat = await Eat.create(req.body);
        return res.status(200).redirect("views/eat-admin.html");
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});


router.get("", async (req, res) => {
    try {
        const eat = await Eat.find().lean().exec();
        return res.status(200).send(eat);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});


router.get("/:id", async (req, res) => {
    try {
        const eat = await Eat.findById(req.params.id).lean().exec();
        return res.status(200).send(eat);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});


router.patch("/:id", authenticate, authorise("admin"), async (req, res) => {
    try {
        const eat = await Eat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(eat);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

router.delete("/:id", authenticate, authorise("admin"), async (req, res) => {
    try {
        const eat = await Eat.findByIdAndDelete(req.params.id);
        return res.status(200).send(eat);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;