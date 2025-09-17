const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || "DevTinder$2629";
const { validateSignUpdata} = require('../utils/validate');
const bcrypt = require("bcrypt");
const { userModel } = require('../models/user');

const isProduction = process.env.NODE_ENV === 'production';
const cookieOptionsBase = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};
const cookieOptions = {
  ...cookieOptionsBase,
  sameSite: isProduction ? 'none' : 'lax',
  secure: isProduction ? true : false,
  ...(process.env.COOKIE_DOMAIN ? { domain: process.env.COOKIE_DOMAIN } : {}),
};

router.post("/signup", async (req, res) => {
      try {
        validateSignUpdata(req);
        const { firstName, lastName, email, Password} = req.body;
        const passwordHash = await bcrypt.hash(Password, 10);
        const user = new userModel(
            {
                firstName,
                lastName,
                email,
                Password: passwordHash,               
            }
        );
        const savedUser = await user.save();
        const token = savedUser.getJWT();
        res.cookie("token", token, cookieOptions);
        res.json({ message: "User added successfully", data: savedUser });
    } catch (err) {
        res.status(400).send( err.message );
    }

})

router.post("/login", async (req, res) => {
    const { email, Password } = req.body;
    const user = await userModel.findOne({ email: email });
    try {
        if (!user) {
            throw new Error("Email or Password is invalid");
        }
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (isPasswordValid) {
            const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "7d" });
            res.cookie("token", token, cookieOptions);
            res.send(user);
        } else {
            throw new Error("Email or Password is invalid");
            
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
});

router.post("/logout", async (req, res) => {
    res.cookie("token", null, { ...cookieOptions, maxAge: 0 });
    res.send("logout successfull")
   
});

module.exports = router;
