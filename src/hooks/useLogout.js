// Import functions and hooks from external files and Firebase SDK
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

// Define a custom React hook named useLogout
const useLogout = () => {
  // Destructure the useSignOut hook to get the signOut function, isLoggingOut state, and error
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  
  // Access the showToast function from the useShowToast hook and the logoutUser function from the auth store
  const showToast = useShowToast();
  const logoutUser = useAuthStore((state) => state.logout);

  // Function to handle the logout process
  const handleLogout = async () => {
    try {
      // Call the signOut function from the useSignOut hook to sign the user out
      await signOut();

      // Remove user information from local storage
      localStorage.removeItem("user-info");

      // Call the logoutUser function from the auth store to update the global state
      logoutUser();
    } catch (error) {
      // Show an error toast if an error occurs during the logout process
      showToast("Error", error.message, "error");
    }
  };

  // Return the handleLogout function, isLoggingOut state, and error for external use
  return { handleLogout, isLoggingOut, error };
};

// Export the useLogout hook for use in other components
export default useLogout;
