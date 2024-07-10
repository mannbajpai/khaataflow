import express from "express";
import { getAllUsers, getUser, updateUser, deleteUser } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();

router.use(authenticate);

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;