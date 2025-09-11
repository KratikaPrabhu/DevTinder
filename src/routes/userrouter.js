const express = require('express');
const { userAuth } = require('../middlewares/auth');
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionrequest');
const { userModel } = require('../models/user');

const user_safe_data = "firstName lastName skills photoUrl gender about ";

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const ConnectionRequests = await ConnectionRequest.find({
      touserId: loggedInUser._id,
      status: "interested",
    })
      .populate('fromuserId', "firstName lastName ");


    res.json({
      message: "Data fetched successfully",
      data: ConnectionRequests,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const ConnectionRequests = await ConnectionRequest.find({
      $or: [

        { fromuserId: loggedInUser._id, status: "accepted" },
        { touserId: loggedInUser._id, status: "accepted" }
      ]
    })
      .populate("fromuserId", user_safe_data)
      .populate("touserId", user_safe_data)
    const data = ConnectionRequests.map((row) => {
      if (row.fromuserId._id.toString() === loggedInUser._id.toString()) {
        return row.touserId;
      }
      return row.fromuserId;
    })
    res.json({
      message: "Data fetched successfully",
      data
    });
  } catch (err) {
    res.status(400).send("error" + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    let limit = req.query.limit;
    limit = limit > 50 ? 50 : limit;
    const page = req.query.page;
    const skip = (page - 1) * limit;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromuserId: loggedInUser._id },
        { touserId: loggedInUser._id }
      ]
    }).select("fromuserId touserId")
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromuserId.toString());
      hideUsersFromFeed.add(req.touserId.toString());
    })
    const user = await userModel.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } }
      ]
    })
      .select(user_safe_data)
      .skip(skip)
      .limit(limit);

    res.json({
      message: "data fetched sucessfully",
      data: user
    })
  } catch (err) {
    res.status(400).send("error" + err.message)
  }
})
module.exports = userRouter;