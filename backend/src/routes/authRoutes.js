import express from "express";
import { signup, login, logout } from "../controllers/authController.js"
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout',authenticate, logout);

export default router;
