import { Router } from 'express';
import { createRequest, getAllRequests, updateRequestStatus } from '../controllers/purchaseRequest.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/role.middleware';

const router = Router();

router.post('/', authenticate, authorizeRole('Employee','Requestor'),createRequest);
router.get('/', authenticate, authorizeRole('Employee','Requestor'),getAllRequests);
router.put('/:id/status', authenticate,authorizeRole('Employee','Requestor'), updateRequestStatus);

export default router;
