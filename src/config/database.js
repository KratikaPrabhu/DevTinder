const mongoose = require("mongoose");

const connectDb = async () => {
  const connectionString = process.env.MONGO_URI;
  console.log("MongoDB URI from env:", connectionString ? "✅ Loaded" : "❌ Missing");

  if (!connectionString) {
    throw new Error("❌ MONGO_URI is not defined in .env");
  }

  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ Mongo connection error:", err.message);
    throw err;
  }
};

module.exports = { connectDb };
