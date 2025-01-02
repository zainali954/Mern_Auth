import rateLimit from "express-rate-limit";
import apiError from "../utils/apiError.js";

const createRateLimiter = (message)=>{

  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    standardHeaders: true, // Send rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    handler: (req, res, next) => {
      // Throw custom ApiError if rate limit exceeded
      next(new apiError(429, message));
    },
  });
}

// Creating specific rate limiters using the generic function
export const loginLimiter = createRateLimiter('Too many login attempts, please try again later.');
export const signupLimiter = createRateLimiter('Too many signup attempts, please try again later.');
export const verifyEmailLimiter = createRateLimiter('Too many verify email attempts, please try again later.');
export const resendEmailLimiter = createRateLimiter('Too many resend requests, please try again later.');

