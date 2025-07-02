import { Router } from 'express';
import { getAllBudgets, createBudget, useBudget } from '../controllers/budget.controller';
import { authorizeRole } from '../middleware/role.middleware';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, getAllBudgets);
router.post('/', authenticate, authorizeRole('Admin'), createBudget);
router.put('/:department/use', authenticate, authorizeRole('Admin'), useBudget);

export default router;
