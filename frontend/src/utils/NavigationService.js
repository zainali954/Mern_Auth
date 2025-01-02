let navigate; // Placeholder for the navigate function

export const setNavigate = (navigateFn) => {
  navigate = navigateFn; // Dynamically set the navigate function
};

export const navigateTo = (path) => {
  if (navigate) {
    navigate(path); // Use the stored navigate function
  } else {
   // If navigate is not available, use setTimeout with delay
   setTimeout(() => {
    window.location.href = path; // Fallback to regular redirection
  }, 1000);
  }
};
