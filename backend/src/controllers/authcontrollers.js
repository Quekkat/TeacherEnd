import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "../models/teachersmodel.js";
import Student from "../models/studentmodel.js";
import OrderList from "../models/orderlistmodel.js";
import Inventory from "../models/inventorymodel.js"
import { generateToken } from "../lib/utility.js";
import cloudinary from "../lib/cloudinary.js";
import History from "../models/historymodel.js";

//todo: remove unused controllers
export const signup = async (req,res)=>{
    const {GMAIL, PASSWORD, FNAME, LNAME, USERNAME}=req.body;
    try{
        //insert code to validate if the variables are set correct here
        if(!GMAIL||!PASSWORD||!FNAME||!LNAME||!USERNAME){
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
            fName: FNAME,
            lName: LNAME,
            username: USERNAME
        });
        //creates token for client then send the new student to Student table
        if (newTeacher){
            generateToken(newTeacher._id,res);
            await newTeacher.save();
            res.status(201).json({id: newTeacher._id, username: newTeacher.username});
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
        const {GMAIL, PASSWORD} = req.body;
    try{
        const teacher = await Teacher.findOne({gmail: GMAIL});

        if (!teacher) return res.status(400).json({message:"Invalid credentials"});
        if(! teacher.isValidated) return res.status(400).json({message: "teacher invalid"});

        const correctPassword = await bcrypt.compare(PASSWORD, teacher.password);
        if(!correctPassword) return res.status(400).json({message:"Invalid credentials"});
        generateToken(teacher._id,res);
        return res.status(200).json({
            id: teacher._id, username: teacher.username
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

export const createInventoryItem = async (req,res)=>{
    try{
        // retrieves data of item to be created
        const {ITEMNAME, GCASHQR, ITEMIMAGE, PRICE, INITIALAMMOUNT} = req.body;
        const teacherID = req.teacher._id;
        //todo: validate the item to be created
        //checks if item already existed in the inventory or not
        const matchedInventoryName = await Inventory.find({itemName: ITEMNAME});
        if(matchedInventoryName.length>0) return res.status(400).json({message:"Item already existed: " + matchedInventoryName});
        console.log("item passed the filter");
        //converts item image and gcash qr into cloudinary url
        const gcashqrcloudinarylink = await cloudinary.uploader.upload(GCASHQR);
        const imagecloudinarylink = await cloudinary.uploader.upload(ITEMIMAGE);
        console.log("item uploaded to cloudinary");

        //finds the teacher gmail
        const teachergmail = await Teacher.findOne({_id: teacherID}).select("gmail");
        if(!teachergmail)return res.status(400).json({message:"teacher doesnt exist"});

        console.log("creating new item");
        //creates new inventory item
        const newInventoryItem = new Inventory({
            itemName: ITEMNAME,
            itemImgLink: imagecloudinarylink.secure_url,
            forSaleAmmount: INITIALAMMOUNT,
            totalAmmount: INITIALAMMOUNT,
            gcashQrImageLink: gcashqrcloudinarylink.secure_url,
            createdByWho: teachergmail,
            price: PRICE
        });

        newInventoryItem.save()
        .then(doc => console.log('User saved:', doc))
        .catch(err => console.error('Error saving user:', err));

        
        if(newInventoryItem){
                return res.status(200).json(newInventoryItem);
        }else{
            res.status(400).json({message:"Invalid user data"});

        }
        
    }catch(error){
        console.log("Error in createInventoryItem controller:", error.message);
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
        const data = JSON.parse(req.body.data);
        if(!req.file || !data) return res.status(400).json({message:" Invalid request"});
        if(!data.ITEMNAME || !data.SIZE || !data.SECTION || !data.YEARLEVEL || !data.AMMOUNT) return res.status(400).json({message:"Invalid request"});
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        const newInventory = new Inventory({
            name: data.ITEMNAME,
            section: data.SECTION,
            size: data.SIZE,
            year: data.YEARLEVEL,
            ammount: data.AMMOUNT,
            ordered: 0,
            preorder: 0,
            imageUrl: imageUrl,
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
        const inventoryList = await Inventory.find({ year: { $in: ["all", level] }});
        if(inventoryList.length<=0) return res.status(404).json({message:"the list is empty"});
        return res.status(200).json(inventoryList);
        
    }catch(error){
        console.log("error in getInventoryListByYear controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const restock = async (req,res)=>{
    try{
        const {id, ammount} = req.body;
        const targetInventoryItem = await Inventory.findById(id);
        if(!targetInventoryItem) return res.status(404).json({message:"Item no longer exist"});
        const preordertoorder = Math.min(targetInventoryItem.preorder, ammount);
        targetInventoryItem.ammount += ammount;
        targetInventoryItem.preorder -= preordertoorder;
        targetInventoryItem.ordered += preordertoorder;
        await targetInventoryItem.save();
        return res.status(200).json(targetInventoryItem);
    }catch(error){
        console.log("error in restock controller");
        res.status(500).json({message:"Internal server Error"});
    }
}
export const orderItem = async (req,res)=>{
    try{
        const {itemID, Studentname} = req.body;
        if (!Array.isArray(Studentname) || Studentname.length === 0) return res.status(400).json({ error: 'Users array is required and must not be empty' });
        const multipleReceipts = Studentname.map(name=>({
            itemID,
            studentName: name,
        }));
        const item = await Inventory.findById(itemID);
        if(!item) return res.status(404).json({message: "Item doesnt exist"});
        const createdReceipts = await OrderList.insertMany(multipleReceipts);

        const amount = Studentname.length;
        const available = item.ammount - item.ordered;
        const orderable = Math.min(amount, available);
        const preorder = amount - orderable;
        item.ordered += orderable;
        item.preorder += preorder;
        await item.save();
        return res.status(201).json(createdReceipts);


    }catch(error){
        console.log("error in orderItem controller");
        res.status(500).json({message:"Internal server Error"});
    }
}