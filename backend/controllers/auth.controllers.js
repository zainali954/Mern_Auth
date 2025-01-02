import apiResponse from '../utils/apiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import User from '../models/userModel.js'
import apiError from '../utils/apiError.js'
import generateJWTs from '../utils/generateJWTs.js'
import { setCookies, clearCookies } from '../utils/cookiesManger.js'
import { sendVerificationEmail, sendVerifiedSuccessMail, sendResetPasswordMail } from '../utils/sendMail.js'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import axios from 'axios'

const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    console.log(req.body)

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new apiError(403, "An account with this email already exists. Please try logging in.")
    }

    const token = crypto.randomBytes(32).toString('hex')
    const hashedToken = await bcrypt.hash(token, 12)
    console.log(token)

    const newUser = await User.create({
        name,
        email,
        password,
        verificationToken: hashedToken,
        verificationTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000)
    })

    const { accessToken, refreshToken } = generateJWTs(newUser._id)
    newUser.refreshToken = refreshToken
    await newUser.save()

    setCookies(res, accessToken, refreshToken)

    // send verification email
    sendVerificationEmail(newUser.email, `${process.env.FRONTEND_URL}/verify?token=${token}`)

    apiResponse.success(res, "Account created successfully. Please check your email for verification.", newUser, 201)
})

// const login = asyncHandler(async (req, res) => {
//     const { email, password } = req.body

//     const user = await User.findOne({ email })
//     if (!user) {
//         throw new apiError(400, "Invalid login attempt. Make sure your email and password are correct.")
//     }
//     if (!user.password) {
//         throw new apiError(400, "This account is linked to Google login. Please use Google to sign in")
//     }

//     const passwordMatch = await user.comparePassword(password)
//     if (!passwordMatch) {
//         throw new apiError(400, "Invalid login attempt. Make sure your email and password are correct.")
//     }

//     const { accessToken, refreshToken } = generateJWTs(user._id)
//     user.lastLogin = Date.now()
//     user.refreshToken = refreshToken
//     await user.save()

//     setCookies(res, accessToken, refreshToken)

//     apiResponse.success(res, "Login successful! Welcome back.", user, 200)
// })

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new apiError(400, "Invalid login attempt. Make sure your email and password are correct.");
    }

    // Check if the account is locked
    const now = new Date();
    if (user.lockUntil && now < user.lockUntil) {
        const timeLeft = Math.ceil((user.lockUntil - now) / (60 * 1000)); // Time left in minutes
        throw new apiError(403, `Account is locked. Try again after ${timeLeft} minutes.`);
    }

    // Check if the account uses Google login
    if (!user.password) {
        throw new apiError(400, "This account is linked to Google login. Please use Google to sign in.");
    }

    // Compare passwords
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
        user.failedAttempts += 1;
        user.lastFailedTime = now;

        // Lock account if failed attempts exceed threshold
        const maxAttempts = 5;
        if (user.failedAttempts >= maxAttempts) {
            const lockDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
            user.lockUntil = new Date(now.getTime() + lockDuration);
            await user.save();
            throw new apiError(403, "Too many failed login attempts. Your account has been locked for 2 hours.");
        }

        await user.save();
        throw new apiError(400, "Invalid login attempt. Make sure your email and password are correct.");
    }

    // Reset failed attempts on successful login
    user.failedAttempts = 0;
    user.lockUntil = null;
    user.lastLogin = now;

    // Generate tokens
    const { accessToken, refreshToken } = generateJWTs(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookies and send response
    setCookies(res, accessToken, refreshToken);

    apiResponse.success(res, "Login successful! Welcome back.", user, 200);
});


const googleLogin = asyncHandler(async (req, res)=>{
    const { code } = req.body;
    console.log("hitting")
    console.log(code)

    if(!code) {
        throw new apiError(400, "Authorization code is required.")
    }
    try {
        // Exchange authorization code for tokens
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: "postmessage",  // Use postmessage for SPAs
            grant_type: 'authorization_code',
        });

        const { access_token } = tokenResponse.data;  // Get only access token

        // Fetch user data from Google
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,  // Use the access token to fetch user data
            },
        });

        const userData = userInfoResponse.data;

        // Check if user already exists in DB
        let user = await User.findOne({ email: userData.email });

        if (!user) {
            user = new User({
                email: userData.email,
                googleId: userData.id,
                name: userData.name,
                profilePic: userData.picture,
                isVerified: true, // Google users are automatically verified
                lastLogin: new Date(), // Set the last login timestamp
            });
            await user.save();  // Save new user to the database
        }else{
            user.googleId= userData.id
            user.lastLogin = new Date();
            await user.save(); // Save changes
        }

        // generate access and refresh tokens
    const { accessToken, refreshToken } = generateJWTs(user._id)

    setCookies(res, accessToken, refreshToken)
    const data = {
        ...user._doc,
        password: undefined,
        refreshToken: undefined
    }
    // send response
    apiResponse.success(res, "Login successful! Welcome back.", data , 200)

    } catch (error) {
        console.error("Error during Google login:", error.response || error.message || error);
        throw new apiError(500, "Failed to log in with Google");
    }
})

const logout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        throw new apiError(401, "Unauthorized. No refresh token provided.");
    }

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new apiError(401, "Invalid or expired refresh token. Please login again.");
    }
    const user_id = decoded.id;

    const user = await User.findById(user_id);
    if (!user) {
        throw new apiError(404, "User not found. Unable to log out.");
    }

    user.refreshToken = undefined;
    await user.save();

    clearCookies(res);

    apiResponse.success(
        res,
        "logged out successfully",
        {},
        200
    );
});


const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;
    console.log(token)

    if (!token) {
        throw new apiError(400, "Token is required. Please request a new verification link.");
    }

    const user = await User.findById(req.user_id)
    if (!user) {
        throw new apiError(404, "User not found. Please go to the login page.");
    }

    if(user.isVerified){
        throw new apiError(400, "Your account is already verified. No further action is needed.")
    }

    if (user.verificationTokenExpiresAt < Date.now()) {
        throw new apiError(410, "Token has expired. Please request a new verification link.");
    }
    const isMatch = await bcrypt.compare(token, user.verificationToken);
    if (!isMatch) {
        throw new apiError(400, "Invalid token. Please login and request a new verification link.");
    }

    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    user.isVerified = true;

    await user.save();

    // send verified success email
    sendVerifiedSuccessMail(user.email)

    apiResponse.success(res, "User successfully verified!", user, 200);
});


const resendLink = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user_id);
    if (!user) {
        throw new apiError(404, "User not found. Please contact support.");
    }

    if (user.isVerified) {
        return res.status(200).json({
            success: true,
            message: "Your account is already verified. No further action is needed.",
        });
    }

    const newToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    user.verificationToken = await bcrypt.hash(newToken, 12);
    user.verificationTokenExpiresAt = expiresAt;
    await user.save();

    sendVerificationEmail(user.email, `${process.env.FRONTEND_URL}/verify?token=${newToken}`)

    apiResponse.success(
        res,
        "A new verification link has been sent to your registered email address.",
        {},
        200
    );
});


const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new apiError(400, "Email is required to reset your password.");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new apiError(404, "User not found. Please check your email.");
    }

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 12);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // Token expires in 1 hour

    user.passwordResetToken = hashedToken;
    user.passwordResetTokenExpiresAt = expiresAt;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // Send email with the reset link
    console.log(resetLink)
    sendResetPasswordMail(user.email, resetLink)

    apiResponse.success(
        res,
        "An email with the password reset link has been sent.",
        resetLink,
        200
    );
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.query;
    const { email, password } = req.body;

    if (!token) {
        throw new apiError(400, "A valid token is required to reset the password.");
    }

    if (!email) {
        throw new apiError(400, "Email is required to reset your password.");
    }

    if (!password) {
        throw new apiError(400, "Password is required to reset your account password.");
    }

    const user = await User.findOne({
        email,
        passwordResetTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
        throw new apiError(401, "Invalid or expired token. Please request a new password reset link.");
    }

    const isTokenValid = await bcrypt.compare(token, user.passwordResetToken);
    if (!isTokenValid) {
        throw new apiError(401, "Invalid or expired token. Please request a new password reset link.");
    }

    user.password = password
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresAt = undefined;
    await user.save();

    apiResponse.success(
        res,
        "Password changed successfully. You can now log in with your new password.",
        {},
        200
    );
});


const refreshAccessToken = asyncHandler(async (req, res) => {
    const existingRefreshToken = req.cookies?.refreshToken;

    if (!existingRefreshToken) {
        throw new apiError(401, "Session expired. Please login again.");
    }

    let decoded;
    try {
        decoded = jwt.verify(existingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new apiError(401, "Invalid or expired refresh token. Please login again.");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
        throw new apiError(404, "User not found. Please login again.");
    }

    if (user.refreshToken !== existingRefreshToken) {
        throw new apiError(403, "Invalid session. Please login again.");
    }

    const { accessToken, refreshToken } = generateJWTs(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    setCookies(res, accessToken, refreshToken);

    apiResponse.success(
        res,
        "Access token refreshed successfully.",
        {},
        200
    );
});




export { signup, login, googleLogin,  logout, verifyEmail, resendLink, forgotPassword, resetPassword, refreshAccessToken }