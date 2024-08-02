import express from 'express';
import groupExpenseController from '../controllers/groupExpenseController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router= express.Router();

router.use(authenticate);

router.post("/:groupId", groupExpenseController.createGroupExpense);
router.get("/:groupId", groupExpenseController.getGroupExpenses);
router.get("/:groupId/:id", groupExpenseController.getGroupExpenseById);
router.put("/:groupId/:id", groupExpenseController.updateGroupExpense);
router.delete("/:groupId/:id", groupExpenseController.deleteGroupExpense);
router.get("/:groupId/splits/", groupExpenseController.getMySplits);
router.patch("/splits/:splitId/settle", groupExpenseController.settleExpenseSplit);

export default router;

