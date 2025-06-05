import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "../models/teachersmodel.js";
import Student from "../models/studentmodel.js";
import OrderList from "../models/orderlistmodel.js";
import Inventory from "../models/inventorymodel.js"
import { generateToken } from "../lib/utility.js";

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
export const verifyTeacher = async (req,res) =>{
    //TODO:
    const {ID} = req.body;
    try{
        //grabs the sender cookie
        const cookie = req.cookie.tokencookie;
        const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
        //search the unverified teacher
        const unverifiedTeacher = await Teacher.findByID(ID);
        if(!unverifiedTeacher) return res.status(400).json({message:"Invalid teacher"});
        if(unverifiedTeacher.isValidated) return res.status(400).json({message:"Teacher already verified"});
        if(decoded.targetID === unverifiedTeacher._id) return res.status(400).json({message: "Not allowed to verify self"});
        const updatedTeacher = await Teacher.updateOne({_id: ID},{$set:{isValidated: true}},{new:true});
        res.status(200).json({
            verifiedTeacherID: updatedTeacher._id,
            validated: updatedTeacher.isValidated
        });


    }catch(error){
        console.log("error in verify teachers controller", error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}

export const unverifiedTeachersList = async (req,res)=>{
    try{
        const unverifiedTeachers = await Teacher.find({isValidated: false});
        if(!unverifiedTeachers) return res.status(400).json({message: "There are no teachers to be verified"});
        res.status(200).json(unverifiedTeachers);
    }catch(error){
        console.log("Error in unverifiedTeachersList controller:", error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}

export const createInventoryItem = (req,res)=>{
    try{
        // retrieves data of item to be created
        const {ITEMNAME, GCASHQR, ITEMIMAGE, PRICE, INITIALAMMOUNT} = req.body;
        //todo:retrieve id of teacher that added the item
        
    }catch(error){
        console.log("Error in createInventoryItem controller:", error.message);
        res.status(500).json({message:"Internal server Error"});

    }

}
export const seeProductList = async (req,res) =>{
    try{
        const inventory = await Inventory.find({});
        if(inventory.length <=0) return res.status(404).json({message: "Inventory is empty"});
        res.status(200).json(inventory);
    }catch(error){
        console.log("error in seeProductList controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const seeOrderList = (req, res)=>{
    
}
export const addStock = (req,res)=>{

}