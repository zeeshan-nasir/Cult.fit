const authorise = (permittedRole) => {
    return (req, res, next) => {
        const user = req.user;
        let isPermitted = false;

        if (user.role == permittedRole) {
            isPermitted = true;
        }

        if (isPermitted) {
            return next();
        }
        else {
            return res.status(401).send({ message: "You are not authorised to perform this operation" });
        }
    }
}

module.exports = authorise;