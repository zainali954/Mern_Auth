import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Required only if not using Google Auth
      },
      minlength: 6,
    },
    googleId: {
      type: String,
      default: null, // Google Auth ID
    },
    refreshToken: {
      type: String,
      default: null, // Token for Refresh
    },
    profilePic: {
      type: String,
      default: "https://defaultprofilepic.com/default.png", // URL for Profile Picture
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", // Role of the user
    },
    isVerified: {
      type: Boolean,
      default: false, // Email Verification Status
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiresAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpiresAt: {
      type: Date,
      default: null,
    },
    failedAttempts: {
      type: Number,
      default: 0, // Track failed login attempts
    },
    lastFailedTime: {
      type: Date,
      default: null, // Timestamp of the last failed login attempt
    },
    lockUntil: {
      type: Date,
      default: null, // Timestamp until the account is locked
    },
    lastLogin: {
      type: Date,
      default: null, // Last Login Date
    },
    createdAt: {
      type: Date,
      default: Date.now, // Account Creation Date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Last Update Time
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (givenPassword) {
  return bcrypt.compare(givenPassword, this.password);
};

// Method to reset failed attempts
userSchema.methods.resetFailedAttempts = function () {
  this.failedAttempts = 0;
  this.lockUntil = null;
  return this.save();
};

// Method to lock account
userSchema.methods.lockAccount = function (lockDuration) {
  const lockUntil = new Date(Date.now() + lockDuration); // lockDuration in ms
  this.lockUntil = lockUntil;
  return this.save();
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
