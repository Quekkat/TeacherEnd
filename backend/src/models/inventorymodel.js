import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    itemName:{
        type: String,
        required: true,
        unique:true,
    },
    itemImgLink:{
        type: String,
        required: true,
    },
    currentAmmoun:{
        type: Number
    }
})