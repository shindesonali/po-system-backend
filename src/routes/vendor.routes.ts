import { Router } from 'express';
import { getAllVendors, createVendor } from '../controllers/vendor.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, getAllVendors);
router.post('/', authenticate, createVendor);

export default router;
