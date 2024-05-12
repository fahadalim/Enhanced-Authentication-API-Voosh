// routes/profile.js
import { Router } from 'express';
const router = Router();
import { getMyProfile, updateMyProfile, updateProfileVisibility, getUserProfile } from '../controllers/profileController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

router.get('/me', authenticate, getMyProfile);
router.put('/me', authenticate, updateMyProfile);
router.put('/visibility', authenticate, updateProfileVisibility);
router.get('/:userId', authenticate, getUserProfile);

export default router;
