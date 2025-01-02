import express from 'express'
const router = express.Router();

import { signup, login, logout, verifyEmail, resendLink, forgotPassword, resetPassword, refreshAccessToken, googleLogin } from "../controllers/auth.controllers.js";
import verifyAuth from "../middlewares/verifyAuth.js";
import { loginLimiter, resendEmailLimiter, verifyEmailLimiter } from '../middlewares/limiter.js';


router.post('/signup', signup)
router.post('/login', loginLimiter, login)
router.post('/google-login', googleLogin)
router.post('/logout', logout)
router.post('/verify', verifyEmailLimiter, verifyAuth, verifyEmail)
router.post('/resend-link', resendEmailLimiter, verifyAuth, resendLink)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password',  resetPassword)
router.post('/refresh-access-token', refreshAccessToken)

export default router;