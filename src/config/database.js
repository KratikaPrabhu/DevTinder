const mongoose = require("mongoose");

const connectDb = async () => {
  const connectionString = process.env.MONGO_URI || "mongodb://localhost:27017/devTinder";
  console.log("MongoDB URI from env:", connectionString ? "✅ Loaded" : "❌ Missing");

  try {
    await mongoose.connect(connectionString);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ Mongo connection error:", err.message);
    throw err;
  }
};

module.exports = { connectDb };
