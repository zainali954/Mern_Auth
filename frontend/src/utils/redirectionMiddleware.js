// redirectionMiddleware.js
import { navigateTo } from "./NavigationService";
const redirectionMiddleware = (storeAPI) => (next) => (action) => {
    if (action.type === 'auth/login/fulfilled') {
      navigateTo('/admin/dashboard'); // Redirect to the dashboard
    }
  
    if (action.type === 'auth/resetPassword/fulfilled') {
      navigateTo('/login')
    }
  
    return next(action); // Pass the action to the next middleware
  };
  
  export default redirectionMiddleware;
  