import express from "express";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv"
import { connectDB } from "./lib/database.js";
import cookieparser from "cookie-parser";
//message bla bla
dotenv.config();

const app = express();
const PORT = process.env.PORT
app.use(express.json());
app.use(cookieparser());

//Sign in & signup routes
app.use("/api/auth", authRoutes);



//Initializes the backend
app.listen(PORT,()=>{
    console.log("server is running on port:"+PORT);
    connectDB();
})