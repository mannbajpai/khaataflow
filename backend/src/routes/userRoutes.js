import express from "express";
import { getAllUsers, getUser, updateUser, deleteUser } from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
const router = express.Router();

router.use(authenticate);
router.use(authorize);

router.get('/', getAllUsers);
router.get('/me', getUser);
router.patch('/me', updateUser);
router.delete('/me', deleteUser);

export default router;