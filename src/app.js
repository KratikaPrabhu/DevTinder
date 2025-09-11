const express = require('express');
const app = express();
const {connectDb} = require('./config/database');
const cookieParser = require("cookie-parser");
const cors = require("cors")

app.use(cors({
    origin:"http://localhost:5173",
    credentials : true,
}));
app.use(express.json());
app.use(cookieParser());

const router = require('./routes/authRouter')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')
const userRouter = require('./routes/userrouter')

app.use("/",router);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);



connectDb().then(()=>{
      console.log("connection established successfully");
      app.listen(7777,()=>{
        console.log("server is running");
    }); 
}).catch((err)=>{

    console.log("database is not connected");
    
})

