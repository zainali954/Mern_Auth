import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import apiError from '../utils/apiError.js';

const verifyAuth = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    throw new apiError(401, 'Unauthorized. No access token provided.');
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded || !decoded.id) {
      throw new apiError(401, 'Unauthorized. Invalid token.');
    }

    req.user_id = decoded.id;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new apiError(401, 'Unauthorized. Token has expired.');
    } else if (err.name === 'JsonWebTokenError') {
      throw new apiError(401, 'Unauthorized. Invalid token.');
    } else {
      throw new apiError(401, 'Unauthorized. Authentication failed.');
    }
  }
});

export default verifyAuth;
