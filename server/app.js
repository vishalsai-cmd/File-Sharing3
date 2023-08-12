import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from './routes/routes.js';
import DBConnection from "./database/db.js";
import bcrypt from "bcryptjs";
const app=express();
app.use(express.json());
app.use(cors());
app.use('/',router)
const PORT=5050

DBConnection();

const UserDetailsSchema=new mongoose.Schema(
    {
        fname:String,
        lname:String,
        email:{type: String,unique:true},
        password:String,
        
    },
    {
        collection:"UserInfo"
    }
);
mongoose.model("UserInfo",UserDetailsSchema);
const AssignmentSchema=new mongoose.Schema({
    email:String,
    assignment_name:String,
    duedate:String,
    course:String
},{
    collection:"AssignmentInfo"
});
mongoose.model("AssignmentInfo",AssignmentSchema);
const User=mongoose.model("UserInfo");
const Assignment=mongoose.model("AssignmentInfo"); 
app.post("/register",async(req,res) =>{
    const {fname,lname,email,password} =req.body;
    const encryptedPassword=await bcrypt.hash(password,10)
    try{
        const oldUser =await User.findOne({ email });

        if(oldUser){
            return res.send({error:"User Exists"})
        }
       await User.create({
        fname,
        lname,
        email,
        password:encryptedPassword
       });
       res.send({status:"ok"})
    }
    catch(error){
       res.send({status:"error"})
    }
})
app.post("/login-user",async(req,res) =>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.json({error:"User not found"})
    }
    if(await bcrypt.compare(password,user.password))
    {

        if( res.status(201)){
            return res.json({status:"ok"})
        }else{
            return res.json({status:"error"})
        }
    }
    res.json({status:"error",error:"invaid password"})
})

app.listen(PORT,() =>{
    console.log("server started")
})
