const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth')
const { validateprofileData} = require('../utils/validate')
const bcrypt = require("bcrypt");
const { userModel } = require('../models/user');

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);

    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }

})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
         if(!validateprofileData(req)){
            throw new Error("profile data is invalid");
            
         }else{
            const loggedInuser = req.user;
            Object.keys(req.body).forEach(key => {loggedInuser[key]=req.body[key]})
            await loggedInuser.save();
            res.send("profile editted successfully")
         }
    }catch (err) {
        res.status(400).send(err.message)
    }
})
module.exports = profileRouter;