import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    ItemName:{
        type: String,
        required: true,
    },
    ItemYear:{
        type: Number,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    ItemLevel:{
        type: String,
        required: true,
    },
    SQ:{
        type: Number,
        required: true,
    },
    SC:{
        type:Number,
        default: 0,
    },
    ST:{
        type: Number,
        required: true,
    },
    MQ:{
        type: Number,
        required: true,
    },
    MC:{
        type:Number,
        default: 0,
    },
    MT:{
        type: Number,
        required: true,
    },
    LQ:{
        type: Number,
        required: true,
    },
    LC:{
        type:Number,
        default: 0,
    },
    LT:{
        type: Number,
        required: true,
    },
    XLQ:{
        type: Number,
        required: true,
    },
    XLC:{
        type:Number,
        default: 0,
    },
    XLT:{
        type: Number,
        required: true,
    },
    XXLQ:{
        type: Number,
        required: true,
    },
    XXLC:{
        type:Number,
        default: 0,
    },
    XXLT:{
        type: Number,
        required: true,
    },
    OverallTotal :{
        type: Number,
        require: true,
    },
    Price:{
        type: Number,
        default: 100,
    }

}, {timestamps:true});

const Inventory = mongoose.model("Inventory", userSchema);
export default Inventory;