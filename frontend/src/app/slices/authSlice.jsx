import { createSlice } from '@reduxjs/toolkit';
import { signup, login, logout, verifyEmail, resendLink, forgotPassword, resetPassword, googleLogin } from '../../features/auth/asyncThunks';

// Retrieve user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Initial state
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '', // Store backend message for errors or success
};


// Authentication slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload?.data || null; // Safely access user data
        state.message = action.payload?.message || 'Login successful'; // Fallback for message
        localStorage.setItem('user', JSON.stringify(action.payload?.data))
      })

      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload?.data || null; // Safely access user data
        state.message = action.payload?.message || 'Login successful'; // Fallback for message
        localStorage.setItem('user', JSON.stringify(action.payload?.data))
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null; // Safely access user data
        state.message = action.payload?.message || 'Logout successful'; // Fallback for message
        localStorage.setItem("masla",JSON.stringify(action.payload))
        localStorage.removeItem('user')
      })
      // VerifyEmail reducers
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload?.data || null // get new verified user data
        state.message = action.payload?.message || 'Email verification successful';
        localStorage.setItem('user', JSON.stringify(action.payload?.data))
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // VerifyEmail reducers
      .addCase(resendLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload?.message || 'send email succsesful';

      })
      .addCase(resendLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // forgot password reducers
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload?.message || 'send email succsesful';

      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // reset password reducers
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload?.message || 'send email succsesful';

      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Google login
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data;
        state.message = action.payload.message;
        localStorage.setItem('user', JSON.stringify(action.payload.data));  // Store user in localStorage
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
  },
});

// Export actions
export const { reset, } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
