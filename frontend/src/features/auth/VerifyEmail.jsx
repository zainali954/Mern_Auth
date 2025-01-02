import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail, resendLink } from './asyncThunks';
import { reset } from '../../app/slices/authSlice';

const RESEND_TIMEOUT = 60;

const VerifyEmail = () => {
  const { isLoading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [timer, setTimer] = useState(RESEND_TIMEOUT);
  const [state, setState] = useState({
    message: token
      ? 'Please click the button below to verify your account.'
      : 'No verification token found. Please send a verification email.',
    isTokenValid: !!token,
  });
  const navigate = useNavigate();

  // Timer countdown logic
  useEffect(() => {
    let countdown;
    if (timer > 0) {
      const updateTimer = () => setTimer((prev) => prev - 1);
      countdown = setTimeout(updateTimer, 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  // Handle verification
  const handleVerify = async () => {
    if (token) {
      setState((prevState) => ({ ...prevState, isTokenValid: false }));
      await dispatch(verifyEmail(token));
    }
  };

  // Reset auth slice state on component unmount
  useEffect(() => {
    if (user?.isVerified) {
      navigate('/user/dashboard');
    }
    return () => dispatch(reset());
  }, [dispatch, user, navigate]);

  // Handle resend email link
  const handleResend = async () => {
    if (timer === 0) {
      setTimer(RESEND_TIMEOUT);
      setState((prevState) => ({
        ...prevState,
        message: 'We have sent a verification link to your email. Please check your email.',
      }));
      await dispatch(resendLink());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-purple-700 text-center">Verify Your Email</h2>
        <p className="text-gray-500 text-center mt-2">{state.message}</p>

        {/* Show verify or resend button based on token validity */}
        {state.isTokenValid ? (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleVerify}
              className={`py-3 px-6 rounded-md transition ${isLoading ? 'bg-purple-500 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800 text-white'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        ) : (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleResend}
              className={`py-3 px-6 rounded-md transition ${timer > 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800 text-white'}`}
              disabled={timer > 0}
            >
              {timer > 0 ? `Resend in ${timer}s` : 'Send Verification Email'}
            </button>
          </div>
        )}

        {/* "Go to Home Page" Button */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => navigate('/')}
            className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
