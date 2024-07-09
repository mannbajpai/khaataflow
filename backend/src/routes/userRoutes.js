import express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";
const router = express.Router();

router.use(authenticate);

router.get('/:id', getUser);
router.post('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;