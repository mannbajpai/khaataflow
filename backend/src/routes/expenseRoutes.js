import express from 'express';
import expenseController from "../controllers";
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.post('/', expenseController.createExpense);
router.get('/:id', expenseController.getExpense);
router.get('/group/:groupId', expenseController.getAllExpenses);
router.patch('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

export default router;