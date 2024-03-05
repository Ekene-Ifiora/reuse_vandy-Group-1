// Import React hooks and functions from external files and Firebase SDK
import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

// Define a custom React hook named useGetUserProfileById
const useGetUserProfileById = (userId) => {
  // State variables to manage loading status and store user profile data
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Access the showToast function from the useShowToast hook
  const showToast = useShowToast();

  // useEffect to fetch user profile by user ID when the user ID changes
  useEffect(() => {
    // Define an asynchronous function to fetch user profile by user ID
    const getUserProfile = async () => {
      // Set loading state to true before starting the fetch
      setIsLoading(true);
      // Clear existing user profile data in the local state
      setUserProfile(null);

      try {
        // Create a Firestore document reference for the user
        const userRef = await getDoc(doc(firestore, "users", userId));

        // Check if the user document exists, and update the local state with user profile data if available
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
        // Show an error toast if an error occurs during the fetch process
        showToast("Error", error.message, "error");
      } finally {
        // Set loading state back to false after the fetch is complete or if an error occurred
        setIsLoading(false);
      }
    };

    // Call the getUserProfile function when the user ID changes
    getUserProfile();
  }, [showToast, setUserProfile, userId]);

  // Return loading state, user profile data, and setUserProfile function for external use
  return { isLoading, userProfile, setUserProfile };
};

// Export the useGetUserProfileById hook for use in other components
export default useGetUserProfileById;
