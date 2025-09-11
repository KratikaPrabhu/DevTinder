const mongoose = require('mongoose');
// const URI = "mongodb+srv://kratikaNode:zjdB7N5Bva4OEV41@devnode.s7zac.mongodb.net/devTinder";
const connectDb = async ()=>{
    await mongoose.connect("mongodb://localhost:27017/devTinder");
};


//mongodb://localhost:27017/devTinder
module.exports= {
            connectDb,
};