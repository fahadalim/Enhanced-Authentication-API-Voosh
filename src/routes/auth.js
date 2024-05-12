// routes/auth.js
import { Router } from 'express';
const router = Router();
import { register, login, logout, googleLogin, googleCallback } from '../controllers/authController.js';

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details
 *     parameters:
 *       - name: username
 *         description: User's username
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: User's email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password
 *         in: formData
 *         required: true
 *         type: string
 *       - name: role
 *         description: User's role (admin or user)
 *         in: formData
 *         required: true
 *         type: string
 *         enum: [admin, user]
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Error registering user
 */
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/auth/google', googleLogin);
router.get('/auth/google/callback', googleCallback);
// Add routes for other OAuth providers (Facebook, Twitter, GitHub) if needed

export default router;
