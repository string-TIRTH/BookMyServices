const express = require("express");
const adminRouter = express.Router();

adminRouter.get("/signup",(req,res)=>{
    res.send("Sign up")
})

adminRouter.get("/signin",(req,res)=>{
    res.send("Sign In")
})
adminRouter.get("/home",(req,res)=>{
    res.send("Home")
})
adminRouter.get("/profile",(req,res)=>{
    res.send("profile")
})
adminRouter.get("/logout",(req,res)=>{
    res.send("logout")
})
module.exports = adminRouter