import { Router } from 'express';
import { loginAdmin, getMe, logoutAdmin } from '../controllers/authController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', loginAdmin);
router.get('/me', authenticateAdmin, getMe);
router.post('/logout', logoutAdmin);

export default router;
