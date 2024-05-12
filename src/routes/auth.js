// routes/auth.js
import { Router } from 'express';
const router = Router();
import { register, login, logout, googleLogin, googleCallback } from '../controllers/authController.js';

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/auth/google', googleLogin);
router.get('/auth/google/callback', googleCallback);
// Add routes for other OAuth providers (Facebook, Twitter, GitHub) if needed

export default router;
