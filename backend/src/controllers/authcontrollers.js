import { generateToken } from "../lib/utility.js";
import Student from "../models/studentmodel.js";
import bcrypt from "bcryptjs";
import Teacher from "../models/teachersmodel.js";

export const signup = async (req,res)=>{
    const {GMAIL, PASSWORD, FNAME, LNAME, USERNAME}=req.body;
    try{
        //insert code to validate if the variables are set correct here
        if(!GMAIL||!PASSWORD||!FNAME||!LNAME||!USERNAME){
            return res.status(400).json({message:"all fields must be met"});
        }
        const teacher = await Teacher.findOne({gmail: GMAIL});
        if (teacher) return res.status(400).json({message:"gmail already registered"});
        //encrypts password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(PASSWORD, salt);
        const newTeacher = new Teacher({
            gmail: GMAIL,
            password: hashedPassword,
            fName: FNAME,
            lName: LNAME,
            username: USERNAME
        });
        //creates token for client then send the new student to Student table
        if (newTeacher){
            generateToken(newTeacher._id,res);
            await newTeacher.save();
            res.status(201).json({id: newTeacher._id, username: newTeacher.username});
        }else{
            res.status(400).json({message:"Invalid user data"});
        }
    }catch(error){
        console.log("Error in signup controller:", error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}

export const login =async (req,res)=>{
    //Handles login, returns teacher data and jwt
        const {GMAIL, PASSWORD} = req.body;
    try{
        const teacher = await Teacher.findOne({gmail: GMAIL});

        if (!teacher) return res.status(400).json({message:"Invalid credentials"});

        const correctPassword = await bcrypt.compare(PASSWORD, teacher.password);
        if(!correctPassword) return res.status(400).json({message:"Invalid credentials"});
        generateToken(teacher._id,res);
        res.status(200).json({
            id: teacher._id, username: teacher.username
        });
    }catch(error){
        console.log("Error in login controller:", error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}
export const logout =(req,res)=>{
    try{
        res.cookie("tokencookie","",{maxAge:0});
        res.status(200).json({message:"logged out"});
    }catch(error){
        console.log("Error in logout controller:", error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}
export const verifyTeacher = (req,res) =>{

}

export const createUniformList = (req,res)=>{

}
export const seeProductList = (req,res) =>{

}
export const seeOrderList = (req, res)=>{

}
export const addStock = (req,res)=>{

}