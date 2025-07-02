import { Router } from 'express';
import { createOrder, getAllOrders } from '../controllers/order.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/role.middleware';

const router = Router();

router.post('/', authenticate,authorizeRole('PurchasingOfficer'), createOrder);
router.get('/', authenticate,authorizeRole('Admin'), getAllOrders);

export default router;
