import express from "express";
import { login, logout, signup } from "../controllers/authcontrollers.js";
import { protectRoutes } from "../lib/protectedroute.js";

const router = express.Router();

router.post("/signup", protectRoutes, signup);
router.post("/login", login);
router.post("/logout", protectRoutes, logout);
router.post("/verify", protectRoutes)

export default router;