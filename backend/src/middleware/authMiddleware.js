import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const authenticate = async (req, res, next) => {

    const token = (process.env.NODE_ENV === "production")?req.headers.authorization?.split(' ')[1]:req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ status: "fail", message: "User not logged in" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decode.id);
        if (!user) {
            return res.status(401).json({ status: "fail", message: "Please Login Again" })
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ status: "fail", message: "Please Authenticate" });
    }
}

/*export const authorize = async (req, res, next) => {
    next();
}*/

export const authorize = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ status: "fail", message: "User not logged in" });
        }

        if (req.user.id !== user.id) {
            return res.status(403).json({ status: "fail", message: "You are not Authorized" });
        }
        next();
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}
