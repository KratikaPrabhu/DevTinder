const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user');


const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send("You are unathourized")
        }
        const decodedMessage = await jwt.verify(token, JWT_SECRET || "DevTinder$2629");
        const { _id } = decodedMessage;

        const user = await userModel.findById(_id);
        if (!user) {
            throw new Error("user does not exist");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
};
module.exports = {
    userAuth,
};