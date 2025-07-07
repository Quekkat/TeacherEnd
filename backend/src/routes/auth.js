import express from "express";
import { login, logout, signup, createInventory, getInventoryListByYear, restock, orderItem, getOrderItem, deleteItem, getTeachers,deleteTeacher} from "../controllers/authcontrollers.js";
import { protectRoutes, superadmin } from "../lib/protectedroute.js";
import multer from "multer";
const upload = multer({dest:"uploads/"});

const router = express.Router();


router.post("/login", login);
router.post("/logout", protectRoutes, logout);


router.post("/getInventoryListByYear", protectRoutes, getInventoryListByYear);
router.post("/createInventory", protectRoutes, upload.single('itemImage'), createInventory);
router.post("/restock", protectRoutes, restock);
router.post("/orderItem", protectRoutes, orderItem);
router.post("/getorderitem", protectRoutes, getOrderItem);
router.post("/deleteItem", protectRoutes, deleteItem);
router.post("/signup",superadmin, signup);
router.post("/getTeachers", superadmin, getTeachers);
router.post("/deleteTeachers",superadmin, deleteTeacher);

export default router;