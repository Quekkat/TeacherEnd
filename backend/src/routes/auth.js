import express from "express";
import { login, logout, signup, verifyTeacher, seeProductList , unverifiedTeachersList, createInventoryItem, removeInventoryItem, verifyPayment, seeOrderList, transactionHistory, searchTransactionHistory, verifyStudent, unverifiedStudentList, addNewVerifiedPaymentToHistory, addStock} from "../controllers/authcontrollers.js";
import { protectRoutes } from "../lib/protectedroute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoutes, logout);
router.put("/verifyteacher", protectRoutes, verifyTeacher);
router.get("/getinventorylist", protectRoutes, seeProductList);
router.post("/addNewItem", protectRoutes, createInventoryItem)
router.get("/getunverifiedteachers", protectRoutes, unverifiedTeachersList);
router.post("/removeItem", protectRoutes, removeInventoryItem);
router.post("/verifyPayment", protectRoutes, verifyPayment);
router.post("/unverifiedOrderList", protectRoutes, seeOrderList);
router.get("/transactionhistory", protectRoutes, transactionHistory);
router.post("/searchtransactionhistory", protectRoutes, searchTransactionHistory);
router.post("/verifystudent", protectRoutes, verifyStudent);
router.get("/unverifiedstudentlist", protectRoutes, unverifiedStudentList);
router.post("/addnewpayment", protectRoutes, addNewVerifiedPaymentToHistory);
router.post("/restock", protectRoutes, addStock);

export default router;