import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    message:{
        type: String,
        required: true,
    }
}, {timestamps:true});
const History = mongoose.model("History", userSchema);
export default History;