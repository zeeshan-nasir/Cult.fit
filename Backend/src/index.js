const express = require("express");
const app = express();
const cors = require("cors");

// const jwt = require('jsonwebtoken');
// const generateToken = (user) => {
//     return jwt.sign({ user }, process.env.SECRET_KEY);
// }

const passport = require("./configs/google.auth.js");

const userController = require("./controllers/user.controller.js");
const eatController = require("./controllers/eat.controller.js");
const registerController = require("./controllers/register.controller.js");
const loginController = require("./controllers/login.controller.js");
const checkoutController = require("./controllers/checkout.controller.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use("/user", userController);

app.use("/eat", eatController);

app.use("/register", registerController);

app.use("/login", loginController);

app.use("/checkout", checkoutController);


// Google authentication

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://127.0.0.1:5500/Cult.fit/login.html', session: false,
        successRedirect: 'http://127.0.0.1:5500/Cult.fit/eat-admin.html',
    }),

    function (req, res) {
        // const token = generateToken(req.user);
        return res.status(200).send({ user: req.user, token });
    }
);


module.exports = app;