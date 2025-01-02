import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "./asyncThunks";
import { reset } from "../../app/slices/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => state.auth
  );

  // Reset auth slice state on component unmount
  useEffect(() => {
    return () => dispatch(reset());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email))
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-purple-700 text-center">Forgot Password</h2>
        <p className="text-gray-500 text-center mt-2">Enter your email to reset your password</p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-md transition text-white font-medium ${isLoading ? 'bg-purple-500 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>

  );
};

export default ForgotPassword;
