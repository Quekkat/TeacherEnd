
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "../models/teachersmodel.js";
import Student from "../models/studentmodel.js";
import OrderList from "../models/orderlistmodel.js";
import Inventory from "../models/inventorymodel.js"
import { generateToken } from "../lib/utility.js";
import History from "../models/historymodel.js";




//todo: remove unused controllers
export const signup = async (req,res)=>{
    const {GMAIL, PASSWORD}=req.body;
    try{
        console.log("Incoming body", req.body);
        //insert code to validate if the variables are set correct here
        if(!GMAIL||!PASSWORD){
            return res.status(400).json({message:"all fields must be met"});
        }
        const teacher = await Teacher.findOne({gmail: GMAIL});
        if (teacher) return res.status(400).json({message:"gmail already registered"});
        //encrypts password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(PASSWORD, salt);
        const newTeacher = new Teacher({
            gmail: GMAIL,
            password: hashedPassword,
        });
        //creates token for client then send the new student to Student table
        if (newTeacher){
            await newTeacher.save();
            res.status(201).json({id: newTeacher._id, gmail: newTeacher.gmail});
        }else{
            res.status(400).json({message:"Invalid user data"});
        }
    }catch(error){
        console.log("Error in signup controller:", error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}

export const login =async (req,res)=>{
    //Handles login, returns teacher data and jwt
    try{
        const {GMAIL, PASSWORD} = req.body;

        //searches for the teacher
        const teacher = await Teacher.findOne({gmail: GMAIL});
        if (!teacher) return res.status(400).json({message:"Invalid credentials"});

        //checks if correct password
        const correctPassword = await bcrypt.compare(PASSWORD, teacher.password);
        if(!correctPassword) return res.status(400).json({message:"Invalid credentials"});
        generateToken(teacher._id,teacher.superadmin, res);
        return res.status(200).json({
            id: teacher._id, username: teacher.username, superadmin: teacher.superadmin
        });
    }catch(error){
        console.log("Error in login controller:", error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}
export const logout =(req,res)=>{
    try{
        res.cookie("tokencookie","",{maxAge:0});
        res.status(200).json({message:"logged out"});
    }catch(error){
        console.log("Error in logout controller:", error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}
export const verifyTeacher = async (req,res) =>{
    const {ID} = req.body;
    try{
        //grabs the sender cookie
        const cookie = req.cookies.tokencookie;
        const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
        //search the unverified teacher
        const unverifiedTeacher = await Teacher.findById(ID);
        if(!unverifiedTeacher) return res.status(400).json({message:"Invalid teacher"});
        if(unverifiedTeacher.isValidated) return res.status(400).json({message:"Teacher already verified"});
        const doerid = decoded.targetID;
        const teacherid = unverifiedTeacher._id;

        if(teacherid === doerid) return res.status(400).json({message: "Not allowed to verify self"});
        const updatedTeacher = await Teacher.updateOne({_id: ID},{$set:{isValidated: true}},{new:true});
        res.status(200).json({
            verifiedTeacherID: teacherid,
            username: unverifiedTeacher.username,
            verifiedby: doerid,
            updatedTeacher: unverifiedTeacher,
        });


    }catch(error){
        console.log("error in verify teachers controller", error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}

export const unverifiedTeachersList = async (req,res)=>{
    try{
        const unverifiedTeachers = await Teacher.find({isValidated: false});
        if(!unverifiedTeachers) return res.status(400).json({message: "There are no teachers to be verified"});
        res.status(200).json(unverifiedTeachers);
    }catch(error){
        console.log("Error in unverifiedTeachersList controller:", error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}

export const seeProductList = async (req,res) =>{
    try{
        const inventory = await Inventory.find({isForSale:true});
        if(inventory.length <=0) return res.status(400).json({message: "Inventory is empty"});
        return res.status(200).json(inventory);
    }catch(error){
        console.log("error in seeProductList controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const seeOrderList = async (req, res)=>{
    try{
        const unverifiedOrderList = await OrderList.find({paymentVerified:false}).sort({createdAt:-1});
        if(!unverifiedOrderList || unverifiedOrderList.length <=0 ) return res.status(404).json({message:"No unverified order"});
        return res.status(200).json(unverifiedOrderList);
    }catch(error){
        console.log("error in seeOrderList controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const addStock = async (req,res)=>{
    try{
        const {ITEMID, AMMOUNT} = req.body;
        const admin= req.teacher;
        //validates if field is met
        if(!ITEMID||!AMMOUNT){
            return res.status(400).json({message:"all fields must be met"});
        }

        //searches that item based on id
        const itemToRestock = await Inventory.findOneAndUpdate(
            { _id: ITEMID},
            { $inc:{forSaleAmmount: AMMOUNT, totalAmmount: AMMOUNT}},
            {new: true, runValidators:true}
        );
        if(!itemToRestock) return res.status(404).json({message:"item doesnt exist or invalid id"});
        const itemName = itemToRestock.itemName;
        const historyMessage = "Item with ID of \"" + itemToRestock._id + "\" called: \"" + itemToRestock.itemName+ "\" have been restocked with the ammount of: "+ AMMOUNT+ ", according to admin name: \"" + admin.gmail;
        const newHistory = new History({message: historyMessage});
        if(newHistory){
            await newHistory.save();
            res.status(200).json({message: "Item: "+ itemName +" restocked"});
        }else{
            return res.status(400).json({message:"Invalid user data"});

        }


    }catch(error){
        console.log("error in addStock controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const removeInventoryItem = async (req,res)=>{
    try{
        const {ITEMID} = req.body;
        if (!ITEMID) return res.status(400).json({message:"No id provided"});
        const removedItem = await Inventory.findOneAndUpdate({_id: ITEMID}, {$set:{isForSale: false}},{new: true});
        if (!removedItem) return res.status(404).json({message:"Item doesnt exist"});
        return res.status(200).json({message:"Item removed"});
    }catch(error){
        console.log("error in removeInventoryItem controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const verifyPayment = async (req,res)=>{
    try{
        const {paymentID} = req.body;
        const teacher = req.teacher;
        if(!paymentID) return res.status(400).json({message:"No id provided"});
        const verifiedOrder = await OrderList.findByIdAndUpdate(paymentID,{$set:{paymentVerified: true}},{new:true});
        if(!verifiedOrder) return res.status(404).json({message:"Order doesnt exist"});

        const historyMessage = "Payment of student: \"" + verifiedOrder.studentName + "\" on item:\""+ verifiedOrder.itemName+ "\" of item id: \"" + verifiedOrder.itemID + "\" was verified by admin account: \"" + teacher.gmail;
        const newHistory = new History({
            message: historyMessage,
        });
        if(newHistory){
            await newHistory.save();
            return res.status(200).json({message: "Order id: " + verifiedOrder._id + "verified"});
        }else{
            return res.status(400).json({message:"Invalid user data"});

        }

    }catch(error){
        console.log("error in verifyPayment controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const transactionHistory = async (req,res)=>{
    try{
        const transactionHistoryList = await History.find({}).sort({createdAt:-1});
        if(!transactionHistoryList || transactionHistoryList.length<=0) return res.status(400).json({message:"transaction history empty"});
        return res.status(200).json(transactionHistoryList);
    }catch(error){
        console.log("error in transactionHistory controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const searchTransactionHistory = async (req,res)=>{
    try{
        const {SEARCH} = req.body;
        if(!SEARCH) return res.status(400).json({message:"nothing to serch here"});
        const result = await History.find({message:{$regex: SEARCH, $options: 'i'}});
        if(!result || result.length<=0) return res.status(404).json({message:"No results"});
        return res.status(200).json(result);
    }catch(error){
        console.log("error in searchTransactionHistory controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const verifyStudent = async (req,res)=>{
    try{
        const {ID} =req.body;
        if(!ID) return res.status(404).json({message: "student id not provided"});
        const verifiedStudent = await Student.findByIdAndUpdate(ID,{$set:{validated: true}},{new:true});
        if(!verifiedStudent) return res.status(404).json({message:"No student found or student doesnt exist"});
        return res.status(200).json({message:"Student: " + verifiedStudent.firstName + " " + verifiedStudent.lastName + " is verified"});
    }catch(error){
        console.log("error in verifyStudent controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const unverifiedStudentList = async (req,res)=>{
    try{
        const unverifiedStudentList = await Student.find({validated: false}).select("-lmsURNPassword");
        if(!unverifiedStudentList || unverifiedStudentList.length<=0) return res.status(400).json({message:"the database is empty or no student to verify"});
        return res.status(200).json(unverifiedStudentList);
    }catch(error){
        console.log("error in unverifiedStudentList controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const addNewVerifiedPaymentToHistory = async (req,res)=>{
    try{
        //todo: retrieves field from frontend then search the item then update the item if successful add to history
    }catch(error){
        console.log("error in addNewVerifiedPaymentToHistory controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const addNewOrder= async(req,res)=>{
    try{
        const {ITEMID, STUDENTURN} = req.body;
        const teachergmail = req.teacher.gmail;
        const targetStudent = await Student.findOne({lmsURN: STUDENTURN});
        if(!targetStudent) return res.status(404).json({message:"Student doesnt exist"});
        const targetItem = await Inventory.findById(ITEMID);
        if(!targetItem) return res.status(404).json({message:"Item doesnt exist"});
        const wasItemChanged = await Inventory.findOneAndUpdate({_id: ITEMID},{$inc:{orderedAmmount: +1,soldAmmount:+1, forSaleAmmount:-1}},{new:true});
        if(!wasItemChanged) return res.status(404).json({message:"Order failed, item doesnt exist"});

        const historyMessage = "Item: \"" + targetItem.itemName + "\" with item ID of: \"" + targetItem._id + "\" was ordered by student: \"" +targetStudent.firstName + " " + targetStudent.lastName + "\" with a USN of: \"" + targetStudent.lmsURN + "\" through admin: \"" + teachergmail +"\"";
        const newHistory = new History({
            message: historyMessage,
        });
        if(newHistory){
            await newHistory.save();
            res.status(200).json(historyMessage);
        }else{
            return res.status(400).json({message:"Invalid user data"});

        }
    } catch(error){
        console.log("error in addNewOrder controller");
        res.status(500).json({message:"Internal server Error"});
    }
}

//-----------------------------------------------new------------------------------------------------------------
export const createInventory = async(req,res)=>{
    try{
        const {Year,Name,Level,Small,Medium,Large,XLarge,XXLarge, Price} = req.body;
        if(!Year || !Name||!Level||!Small||!Medium||!Large|| !XLarge ||!XXLarge) return res.status(400).json({message:"Invalid request"});

        const total = Small+ Medium + Large +XLarge + XXLarge;
        const newInventory = new Inventory({
            ItemName: Name, ItemYear: Year, ItemLevel: Level,
            SQ: Small, ST: Small,
            MQ: Medium, MT: Medium,
            LQ: Large, LT: Large,
            XLQ: XLarge, XLT: XLarge,
            XXLQ: XXLarge, XXLT: XXLarge,
            OverallTotal: total,
            Price: Price,

        });
        if(newInventory){
            await newInventory.save();
            return res.status(201).json(newInventory);
        }else{
            return res.status(400).json({message:"Inventory not saved"});
        }
    }catch(error){
        console.log("error in createInventory controller");
        res.status(500).json({message:"Internal server Error"});
    }
}

export const getInventoryListByYear = async (req,res)=>{
    try{
        const {level} = req.body;
        console.log(level);
        if(level == "" ||!level) return res.status(404).json({message:"no specified level"});
        const inventoryList = await Inventory.find({deleted: false, $or: [ { ItemLevel: level },{ ItemLevel: "all" }]});
        if(inventoryList.length<=0) return res.status(404).json({message:"the list is empty"});
        return res.status(200).json(inventoryList);
        
    }catch(error){
        console.log("error in getInventoryListByYear controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const restock = async (req,res)=>{
    try{
        const {id, SMALL, MEDIUM, LARGE, XL, XXL} = req.body;
        const totalAdded = SMALL+ MEDIUM+LARGE+XL+XXL
        const targetInventoryItem = await Inventory.findById(id);
        if(!targetInventoryItem) return res.status(404).json({message:"Item no longer exist"});

        targetInventoryItem.SQ += SMALL;
        targetInventoryItem.ST += SMALL;
        targetInventoryItem.MQ += MEDIUM;
        targetInventoryItem.MT += MEDIUM;
        targetInventoryItem.LQ += LARGE;
        targetInventoryItem.LT += LARGE;
        targetInventoryItem.XLQ += XL;
        targetInventoryItem.XLT += XL;
        targetInventoryItem.XXLQ += XXL;
        targetInventoryItem.XXLT += XXL;
        targetInventoryItem.OverallTotal += totalAdded;
        await targetInventoryItem.save();
        return res.status(200).json(targetInventoryItem);
    }catch(error){
        console.log("error in restock controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const orderItem = async (req,res)=>{
    try{
        const {id, SMALL, MEDIUM, LARGE, XLARGE, XXLarge} = req.body;
        if (!id || !SMALL ||! MEDIUM ||!LARGE||!XLARGE ||!XXLarge) return res.status(400).json({message: "Incomplete request"});
        const item = await Inventory.findById(id);
        if(!item) return res.status(404).json({message: "Item doesnt exist"});
        item.SQ -= SMALL; item.SC += SMALL;
        item.MQ -= MEDIUM; item.MC += MEDIUM;
        item.LQ -= LARGE; item.LC += LARGE;
        item.XLQ -= XLARGE; item.XLC += XLARGE;
        item.XXLQ -= XXLarge; item.XXLC += XXLarge;
        await item.save();
        return res.status(201).json(item);


    }catch(error){
        console.log("error in orderItem controller", error);
        res.status(500).json({message:"Internal server Error"});
    }
}
export const getOrderItem = async (req,res)=>{
    try{
        const data = await OrderList.find({});
        res.status(200).json(data);
    }catch(error){
        console.log("error in getOrderItem controller");
        res.status(500).json({message:"Internal server Error"});
    }
}

export const deleteItem = async (req,res)=>{
    try{
        const {id} = req.body;
        const item = await Inventory.findByIdAndUpdate(id, {deleted: true}, {new: true});
        if (!item) return res.status(404).json({message: "Item not found"});
        return res.status(200).json(item);

    }catch(error){
        console.log("error in deleteItem controller", error);
        res.status(500).json({message:"Internal server Error"});    
    }
}
export const getTeachers = async (req,res)=>{
    try{
        const teachers = await Teacher.find({superadmin:false});
        return res.status(200).json(teachers);
    }catch(error){
        console.log("error in getTeachers controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const deleteTeacher = async (req, res)=>{
    try{
        console.log("delete id:", req.body);
        const {ID} = req.body;
        if(!ID) return res.status(400).json({message: "incomplete request"});
        const teacher = await Teacher.findByIdAndDelete(ID);
        return res.status(200).json(teacher);
    }catch(error){
        console.log("error in deleteTeacher controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const claimOrder = async (req,res)=>{
    try{
        const {id, SMALL, MEDIUM, LARGE,XL,XXL} = req.body;
        if(!id) return res.status(404).json({message:"Incomplete request"});
        const item = await Inventory.findById(id);
        item.SC -= SMALL;
        item.MC-= MEDIUM;
        item.LC-= LARGE;
        item.XLC -= XL;
        item.XXLC -= XXL;
        await item.save();
        return res.status(200).json(item);
    }catch(error){
        console.log("error in claimOrder controller:", error);
        res.status(500).json({message:"Internal server Error"});

    }
}