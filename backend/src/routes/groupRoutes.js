import express from 'express';
import groupController from "../controllers"
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

export default router;