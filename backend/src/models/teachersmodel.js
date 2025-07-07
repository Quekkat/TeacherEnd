import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    gmail:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    superadmin:{
        type: Boolean,
        default: false
    } 
}, {timestamps:true});

const Teacher = mongoose.model("Teacher", userSchema);
export default Teacher;