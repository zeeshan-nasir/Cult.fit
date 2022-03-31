require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) return reject(err)
            return resolve(decoded);
        });
    });
}

const authenticate = async (req, res, next) => {
    if (!req.headers.authorisation)
        return res.status(400).send({ message: "Authorisation token not found or incorrect" });

    if (!req.headers.authorisation.startsWith("Bearer "))
        return res.status(400).send({ message: "Authorisation token not found or incorrect" });

    const token = req.headers.authorisation.trim().split(" ")[1];

    let decoded;
    try {
        decoded = await verifyToken(token);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ message: "Authorisation token not found or incorrect" });
    }

    console.log(decoded);

    req.user = decoded.user;
    return next();
}

module.exports = authenticate;