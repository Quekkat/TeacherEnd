import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    lmsURN:{
        type: String,
        required: true,
        unique:true,
    },
    lmsURNPassword:{
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type: String,
        required: true,
    },
    section:{
        type: String,
        required: true,
    },
    yearOrLevel:{
        type: String,
        required:true,
    },
    validated:{
        type: Boolean,
        default:false,
    }
}, {timestamps:true});

const Student = mongoose.model("Student", userSchema);

export default Student;