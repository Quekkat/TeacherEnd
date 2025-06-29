import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    section:{
        type: String,
        required: true,
    },
    size:{
        type: String,
        required: true,
    },
    year:{
        type: String,
        required: true,
    },
    ammount:{
        type: Number,
        required: true,
    },
    ordered:{
        type: Number,
        required: true,
    },
    preorder:{
        type: Number,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    }
}, {timestamps:true});

const Inventory = mongoose.model("Inventory", userSchema);
export default Inventory;