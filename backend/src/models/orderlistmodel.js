import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    itemName:{
        type: String,
        required:true,
    },
    itemID:{
        type: String,
        required: true,
    },
    proofOfPaymentImage:{
        type: String,
        default: "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-1024.png"
    },
    studentName:{
        type: String,
        required: true,
    },
    studentUID:{
        type: String,
        required: true,
    }
},{timestamps:true});
//date ordered comes from timestamp
const OrderList = mongoose.model("OrderList", userSchema);
export default OrderList;