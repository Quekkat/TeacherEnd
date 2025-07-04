import express from "express";
import { login, logout, signup, verifyTeacher, seeProductList , unverifiedTeachersList, createInventoryItem, removeInventoryItem, verifyPayment, seeOrderList, transactionHistory, searchTransactionHistory, verifyStudent, unverifiedStudentList, addNewVerifiedPaymentToHistory, addStock, addNewOrder, createInventory, getInventoryListByYear, restock, orderItem, getOrderItem, deleteItem} from "../controllers/authcontrollers.js";
import { protectRoutes } from "../lib/protectedroute.js";
import multer from "multer";
const upload = multer({dest:"uploads/"});

const router = express.Router();


//todo: remove unused routes later
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoutes, logout);
router.put("/verifyteacher", protectRoutes, verifyTeacher);
router.get("/getinventorylist", protectRoutes, seeProductList);
router.post("/addNewItem", protectRoutes, createInventoryItem)
router.get("/getunverifiedteachers", protectRoutes, unverifiedTeachersList);
router.post("/removeItem", protectRoutes, removeInventoryItem);
router.post("/verifyPayment", protectRoutes, verifyPayment);
router.get("/unverifiedOrderList", protectRoutes, seeOrderList);
router.get("/transactionhistory", protectRoutes, transactionHistory);
router.post("/searchtransactionhistory", protectRoutes, searchTransactionHistory);
router.post("/verifystudent", protectRoutes, verifyStudent);
router.get("/unverifiedstudentlist", protectRoutes, unverifiedStudentList);
router.post("/addnewpayment", protectRoutes, addNewVerifiedPaymentToHistory);
router.post("/addNewOrder", protectRoutes, addNewOrder);


router.post("/getInventoryListByYear", protectRoutes, getInventoryListByYear);
router.post("/createInventory", protectRoutes, upload.single('itemImage'), createInventory);
router.post("/restock", protectRoutes, restock);
router.post("/orderItem", protectRoutes, orderItem);
router.post("/getorderitem", protectRoutes, getOrderItem);
router.post("/deleteItem", protectRoutes, deleteItem);

export default router;