const mongoose = require('mongoose');
// Prefer environment variable for DB connection when available (e.g., Vercel)
const connectDb = async ()=>{
    const connectionString =  "mongodb://localhost:27017/devTinder";
    await mongoose.connect(connectionString);
};


//mongodb://localhost:27017/devTinder
module.exports= {
            connectDb,
};