import express from 'express';
import * as groupController from "../controllers/groupController.js"
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', groupController.createGroup);
router.get('/:id', groupController.getGroup);
router.get('/', groupController.getAllGroups);
router.post('/join', groupController.joinGroup);
router.patch('/:id', groupController.updateGroup);
router.delete('/:groupId/leaveGroup', groupController.leaveGroup);
router.delete('/:id', groupController.deleteGroup);
router.get('/:groupId/members', groupController.getMembers);
router.get('/:groupId/member', groupController.isGroupMember);
router.delete('/:groupId/members/:memberId', groupController.removeMember);

export default router;