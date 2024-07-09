import express from 'express';
import groupController from "../controllers/groupController.js"
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', groupController.createGroup);
router.get('/:id', groupController.getGroup);
router.get('/', groupController.getAllGroups);
router.post('/join', groupController.joinGroup);
router.patch('/:id', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);

export default router;