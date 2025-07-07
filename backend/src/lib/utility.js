import jwt from "jsonwebtoken";

//creates a token then send it to user's cookies
export const generateToken = (targetID, superadmin, res) =>{
    const token = jwt.sign({targetID, superadmin}, process.env.JWT_SECRET,{expiresIn:"1d"});
    res.cookie("tokencookie",token,{
        maxAge:24*60*60*1000,
        httpOnly:true, //xss
        sameSite:"strict", //csrf
        secure: false, //only in https
    })
    return token;
}