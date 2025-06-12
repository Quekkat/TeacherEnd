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
    forSaleAmmount:{
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
        type: String,
        required: true,
    },
    soldAmmount:{
        type: Number,
        default:0,
    },
    isForSale:{
        type: Boolean,
        default: true,
    }
});
const Inventory = mongoose.model("Inventory", userSchema);
export default Inventory;