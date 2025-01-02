import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { setupInterceptors } from '../services/apiClient';
import toastMiddleware from '../utils/toastMiddleware';
import redirectionMiddleware from '../utils/redirectionMiddleware';
const store = configureStore({
  reducer: {
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(toastMiddleware, redirectionMiddleware),
})

setupInterceptors(store);

export default store