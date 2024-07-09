import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const authenticate = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({status: "fail", message:"User not logged in"});
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decode.id);
        if (!user) {
            return res.status(401).json({status: "fail", message:"Please Login Again"})
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ status: "fail", message:"Please Authenticate"});
    }
}
