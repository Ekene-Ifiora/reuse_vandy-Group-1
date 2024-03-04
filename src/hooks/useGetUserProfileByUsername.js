// Import React hooks and functions from external files and Firebase SDK
import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

// Define a custom React hook named useGetUserProfileByUsername
const useGetUserProfileByUsername = (username) => {
  // State variables to manage loading status, access user profile data, and update user profile in store
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();

  // useEffect to fetch user profile by username when the username changes
  useEffect(() => {
    // Define an asynchronous function to fetch user profile by username
    const getUserProfile = async () => {
      // Set loading state to true before starting the fetch
      setIsLoading(true);

      try {
        // Create a Firestore query to get user profiles with the provided username
        const q = query(collection(firestore, "users"), where("username", "==", username));

        // Fetch user profiles from Firestore using the query
        const querySnapshot = await getDocs(q);

        // If no matching user profiles are found, set user profile to null and return
        if (querySnapshot.empty) return setUserProfile(null);

        // Initialize a variable to store the retrieved user profile
        let userDoc;

        // Iterate through the query snapshot and update userDoc with the first matching user profile
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });

        // Update the user profile in the store and log the userDoc to the console (for debugging purposes)
        setUserProfile(userDoc);
        console.log(userDoc);
      } catch (error) {
        // Show an error toast if an error occurs during the fetch process
        showToast("Error", error.message, "error");
      } finally {
        // Set loading state back to false after the fetch is complete or if an error occurred
        setIsLoading(false);
      }
    };

    // Call the getUserProfile function when the username changes
    getUserProfile();
  }, [setUserProfile, username, showToast]);

  // Return loading state and the fetched user profile for external use
  return { isLoading, userProfile };
};

// Export the useGetUserProfileByUsername hook for use in other components
export default useGetUserProfileByUsername;
