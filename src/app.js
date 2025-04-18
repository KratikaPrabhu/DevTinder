const express = require('express');
const app = express();

app.use("/test",(req,res)=>{
    res.send("test the cad WORLD");
})

app.listen(7777,()=>{
    console.log("server is running");
    
})