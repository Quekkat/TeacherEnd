import express from "express";
import { login, logout, signup, verifyTeacher, seeProductList , unverifiedTeachersList, createInventoryItem} from "../controllers/authcontrollers.js";
import { protectRoutes } from "../lib/protectedroute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoutes, logout);
router.put("/verifyteacher", protectRoutes, verifyTeacher);
router.get("/getinventorylist", protectRoutes, seeProductList);
router.put("/addNewItem", protectRoutes, createInventoryItem)
router.get("/getunverifiedteachers", protectRoutes, unverifiedTeachersList);

export default router;