import express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();

router.use(authenticate);

router.get('/:id', getUser);
router.post('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;