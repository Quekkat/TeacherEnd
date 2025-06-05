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
    availableAmmount:{
        type: Number,
        default:1,
    },
    orderedAmmount:{
        type: Number,
        default:0,
    },
    gcashQrImageLink:{
        type: String,
        required:true,
    },
    totalAmmount:{
        type: Number,
        default: 1,
    },
    createdByWho:{
        typeof: String,
        required: true,
    }
});
const Inventory = mongoose.model("Inventory", userSchema);
export default Inventory;