import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "./asyncThunks";
import { reset } from "../../app/slices/authSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timer, setTimer] = useState(60); // Timer state for resend button

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = localStorage.getItem("user-email");

  const { isLoading } = useSelector((state) => state.auth);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Reset auth slice state on component unmount
  useEffect(() => {
    return () => dispatch(reset());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match.")
      return; // Middleware handles toast
    }

    if (!email) {
      toast.error("Email is required to change the password.")
      return; // Middleware handles toast
    }

    dispatch(resetPassword({ token, password, email }));
  };

  const handleResend = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-purple-700 text-center">Reset Password</h2>
        <p className="text-gray-500 text-center mt-2">Enter and confirm your new password</p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-md transition text-white font-medium ${isLoading ? 'bg-purple-500 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        {/* Resend Password Reset Link */}
        <div className="mt-6 text-center">
          {timer > 0 ? (
            <p className="text-gray-500 text-sm">
              Resend password reset link in <span className="font-bold">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="w-full py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition"
            >
              Resend Password Reset Link
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
