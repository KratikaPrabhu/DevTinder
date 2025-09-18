require('dotenv').config();

const express = require('express');
const app = express();
const {connectDb} = require('./config/database');
const cookieParser = require("cookie-parser");
const cors = require("cors")

const allowedOrigins = [
  "http://localhost:5173",                  
  "http://localhost:5174",                 
  "https://devtinder-frontend-sepia.vercel.app"  
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,  // allow cookies & auth headers
  })
);
const router = require('./routes/authRouter')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')
const userRouter = require('./routes/userrouter')

// Health check
app.get('/', (req, res) => {
    res.status(200).send('OK');
});

app.use("/",router);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);



connectDb().then(()=>{
      console.log("connection established successfully");
      const PORT = process.env.PORT || 7777;
      app.listen(PORT,'0.0.0.0',()=>{
        console.log("server is running");
    }); 
}).catch((err)=>{

    console.log("database is not connected");
    
})

