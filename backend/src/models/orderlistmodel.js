import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    itemID:{
        type: String,
        required:true,
    },
    studentName:{
        type: String,
        required: true,
    },
    itemName:{
        type: String,
        required:true
    }

},{timestamps:true});
//date ordered comes from timestamp
const OrderList = mongoose.model("OrderList", userSchema);
export default OrderList;