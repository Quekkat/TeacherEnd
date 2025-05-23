import express from "express";
import { login, logout, signup, verifyTeacher } from "../controllers/authcontrollers.js";
import { protectRoutes } from "../lib/protectedroute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoutes, logout);
router.post("/verifyteacher", protectRoutes, verifyTeacher);

export default router;