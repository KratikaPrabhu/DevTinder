const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionrequest');
const { userModel } = require('../models/user');

requestRouter.post("/request/send/:status/:touserId", userAuth, async (req, res) => {
    try {
        const fromuserId = req.user._id;
        const touserId = req.params.touserId;
        const status = req.params.status;

        const allowedstatus = ["ignore", "interested"];
        if (!allowedstatus.includes(status)) {
           return res.status(400).json({ message: "invalid status type " + status })
        }
        if (fromuserId == touserId) {
            throw new Error("you cannot send request to yourself");
        }
        const touser = await userModel.findById(touserId)
        if (!touser) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromuserId, touserId },
                { fromuserId: touserId, touserId: fromuserId },
            ],
        })
        if (existingConnectionRequest) {
            throw new Error("connection requests already exists");
        }
        const connectionrequest = new ConnectionRequest({
            fromuserId,
            touserId,
            status,
        })
        const data = await connectionrequest.save();
        res.json({
            message: req.user.firstName + " is " + status + " in " + touser.firstName,
            data,
        })
    } catch (err) {
        res.status(400).send("error " + err.message);
    }
});

requestRouter.post("/request/send/review/:status/:requestedId", userAuth, async (req, res) => {
    try {
        const loggedInuser = req.user;
        const { status, requestedId } = req.params;
        const allowedstatus = ["accepted", "rejected"];
        if (!allowedstatus.includes(status)) {
            return res.status(400).send({ message: "status is invalid " + status })
        }
        const connectionrequest = await ConnectionRequest.findOne({
            _id: requestedId,
            status: "interested",
            touserId: loggedInuser._id,

        })
        if (!connectionrequest) {
            return res.status(400).send({ message: "connection request not found" })
        }
        connectionrequest.status = status;

        const data = await connectionrequest.save();
        res.json({ message: "connection request " + status, data })
    } catch (err) {
        res.status(400).send("error " + err.message);
    }
})
module.exports = requestRouter;