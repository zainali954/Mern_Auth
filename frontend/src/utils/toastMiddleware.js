import { toast } from 'react-hot-toast';

const toastMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith('/fulfilled')) {

    if (action.payload?.explicitLogout) { // Show success toast only for explicit logout
      toast.success("You have been logged out successfully.");
    } else {
      if (action.payload?.message.includes("logged out successfully")) {
        return next(action);
      } else {
        toast.success(action.payload?.message || 'Action completed successfully!');
      }
    }
  } else if (action.type.endsWith('/rejected')) {
    const error = action.payload || 'An error occurred!';

    // Handle session expiry and missing token scenarios
    if (
      error.includes("Unauthorized. No access token provided.") ||
      error.includes("Unauthorized. No refresh token provided.") ||
      error.includes("Session expired. Please login again.") ||
      error.includes("Invalid or expired refresh token. Please login again.") ||
      error.includes('Unauthorized. Authentication failed.') ||
      error.includes('Unauthorized. Invalid token.')
    ) {
      toast.error("Session expired. Please log in again.");
      return next(action);
    }

    // Other errors (like invalid session, user not found)
    if (error.includes("User not found. Please login again.")) {
      toast.error("User session not found. Please log in again.");
      return next(action);
    }

    if (error.includes("Invalid session. Please log in again.")) {
      toast.error("Invalid session. Please log in again.");
      return next(action);
    }
    toast.error(error); 
  }
  return next(action);
};

export default toastMiddleware;
