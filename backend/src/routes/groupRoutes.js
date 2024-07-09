import express from 'express';
import groupController from "../controllers"
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.post('/', groupController.createGroup);
router.get('/:id', groupController.getGroup);
router.get('/', groupController.getAllGroups);
router.post('/join', groupController.joinGroup);
router.patch('/:id', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);

export default router;