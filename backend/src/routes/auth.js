import express from "express";
import { login, logout, signup, createInventory, getInventoryListByYear, restock, orderItem, getOrderItem, deleteItem, getTeachers,deleteTeacher} from "../controllers/authcontrollers.js";
import { protectRoutes, superadmin } from "../lib/protectedroute.js";

const router = express.Router();


router.post("/login", login);
router.post("/logout", protectRoutes, logout);


router.post("/getInventoryListByYear", protectRoutes, getInventoryListByYear);
router.post("/newInventory", protectRoutes, createInventory);
router.post("/restock", protectRoutes, restock);
router.post("/makeOrder", protectRoutes, orderItem);
router.post("/delete", protectRoutes, deleteItem);
router.post("/signup",superadmin, signup);
router.post("/getTeachers", superadmin, getTeachers);
router.post("/deleteTeachers",superadmin, deleteTeacher);

export default router;