import { Router } from 'express';
import { getAllApprovals, approveRequest } from '../controllers/approval.controller';
import { authorizeRole } from '../middleware/role.middleware';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, getAllApprovals);
router.post('/', authenticate, authorizeRole('Approver', 'Manager'), approveRequest);

export default router;
