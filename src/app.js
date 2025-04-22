const express = require('express');
const app = express();

app.use("/test",(req,res)=>{
    res.send("test the cad WORLD");
})
app.use("/hello/2/6788",(req,res)=>{
    res.send("hello 6788 the cad WORLD");
})
app.use("/hello/2",(req,res)=>{
    res.send("hello 2222 the cad WORLD");
})
app.use("/hello",(req,res)=>{
    res.send("hello the cad WORLD");
})
app.use("/",(req,res)=>{
    res.send("///// the cad WORLD");
})
app.listen(7777,()=>{
    console.log("server is running");
    
})