import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const errorMessageHandler = (error) => {
    return error.response?.data?.message || 
        error.message || 
        'An unexpected error occurred'; // Fallback message
}
// Async thunk for Signup
export const signup = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
    try {
        return await authService.signup(userData);
    } catch (error) {
        const message = errorMessageHandler(error)
        return thunkAPI.rejectWithValue(message);
    }
});

// Async thunk for login
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        const message = errorMessageHandler(error)
        return thunkAPI.rejectWithValue(message);
    }
});

// Async thunk for logout
export const logout = createAsyncThunk('auth/logout', async (explicitLogout = false, thunkAPI) => {
    try {
        const response = await authService.logout();
        if(response?.success){
            return { ...response, explicitLogout }
        }

    } catch (error) {
        const message = errorMessageHandler(error)
        return thunkAPI.rejectWithValue(message);
    }
});

// Async thunk for verifyEmail
export const verifyEmail = createAsyncThunk('auth/verifyEmail', async (token, thunkAPI) => {
    try {
        return await authService.verifyEmail(token);
    } catch (error) {
        
        const message = errorMessageHandler(error)
        return thunkAPI.rejectWithValue(message);
    }
});

// Async thunk for resendLink
export const resendLink = createAsyncThunk('auth/resendLink', async (token, thunkAPI) => {
    try {
        return await authService.resendLink();
    } catch (error) {

        
        const message = errorMessageHandler(error)
        return thunkAPI.rejectWithValue(message);
    }
});

// Async thunk for frogot-password
export const forgotPassword = createAsyncThunk('auth/forgot-password', async (email, thunkAPI) => {
    try {
        localStorage.setItem("user-email", JSON.stringify(email))
        return await authService.forgotPassword(email)
    } catch (error) {
        
        const message = errorMessageHandler(error)
        return thunkAPI.rejectWithValue(message);
    }
})
// Async thunk for reset-password
export const resetPassword = createAsyncThunk('auth/reset-password', async (data, thunkAPI) => {
    try {
        return await authService.resetPassword(data)
    } catch (error) {
        
        const message = errorMessageHandler(error)
        return thunkAPI.rejectWithValue(message);
    }
})

// Async thunk for google-login
export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
    async (code, thunkAPI) => {
        try {
            const response = await authService.googleLogin(code);
            if (response.data.success) {
                return response.data;  
            } else {
                return thunkAPI.rejectWithValue(response.data.message);
            }
        } catch (error) {
            
            const message = errorMessageHandler(error)
            return thunkAPI.rejectWithValue(message);
        }
    }
);