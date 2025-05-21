import jwt from "jsonwebtoken";
import Student from "../models/studentmodel";

export const protectRoutes=async (request,response,next)=>{
    try{
        const token = request.cookies.tokencookie;
        if(!token) return response.status(401).json({message:"unauthorized"});
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return response.status(401).json({message:"unauthorized"});
        const student =await Student.findById(decoded.targetID).select("-lmsURNPassword");
        if(!student) return response.status(401).json({message:"unauthorized"});
        request.student=student;
        next();
    }catch(error){
        console.log("Error in protected middleware:", error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}