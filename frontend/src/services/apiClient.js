import axios from 'axios';
import { logout } from '../features/auth/asyncThunks'; // Redux action for logout

import { API_BASE_URL } from '../utils/config';
import { navigateTo } from '../utils/NavigationService';

const apiClient = axios.create({
  baseURL: API_BASE_URL, // Backend base URL
  withCredentials: true, // Include cookies with every request
});

// Setup Axios interceptors
export const setupInterceptors = (store) => {
  apiClient.interceptors.response.use(
    (response) => response, // Successful responses
    async (error) => {
      const originalRequest = error.config;
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";

      if (status === 401) {

        switch (errorMessage) {
          // Cases that require logout
          case "Session expired. Please login again.":
          case "Invalid or expired refresh token. Please login again.":
          case "User not found. Please login again.":
          case "Invalid session. Please login again.":
          case "Unauthorized. No access token provided.":
          case "Unauthorized. Invalid token.":
          case "Unauthorized. Authentication failed.":
            await store.dispatch(logout());
            localStorage.removeItem('user');

            navigateTo('/')
            return Promise.reject(error);

          // no refresh Token remove user from frontend and navigate to home page
          case "Unauthorized. No refresh token provided.":
            localStorage.removeItem('user');
            navigateTo('/')
            return Promise.reject(error);

          // Handle token expiration and attempt refresh
          case "Unauthorized. Token has expired.":
            if (!originalRequest._retry) {
              originalRequest._retry = true;
              try {
                await axios.post(
                  "http://localhost:3000/api/v1/auth/refresh-access-token",
                  {},
                  { withCredentials: true }
                );
                return apiClient(originalRequest); // Retry original request
              } catch (refreshError) {
                await store.dispatch(logout());
                localStorage.removeItem('user');
                window.location.href = '/'; // Navigate on failure
                return Promise.reject(refreshError);
              }
            } else {
            }
            break;

          default:
            return Promise.reject(error); // Reject error if no specific case is handled
        }
      } else {
        return Promise.reject(error); // Forward non-401 errors
      }
    }
  );
};

export default apiClient;
