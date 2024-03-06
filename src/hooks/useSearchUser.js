// Import React hooks and functions from external files and Firebase SDK
import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

// Define a custom React hook named useSearchUser
const useSearchUser = () => {
  // State variables to manage loading status, user details, and access to showToast function
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  // Function to get details of a user based on their username
  const getUserProfile = async (username) => {
    // Set loading state to true before starting the search
    setIsLoading(true);

    // Clear previous user details
    setUser(null);

    try {
      // Create a Firestore query to search for users with the given username
      const q = query(collection(firestore, "users"), where("username", "==", username));

      // Fetch users from Firestore based on the query
      const querySnapshot = await getDocs(q);

      // Show an error toast if no users are found with the given username
      if (querySnapshot.empty) return showToast("Error", "User not found", "error");

      // Iterate through the query snapshot and update the user details with the first matching user
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      // Show an error toast if an error occurs during the search process
      showToast("Error", error.message, "error");

      // Clear user details
      setUser(null);
    } finally {
      // Set loading state back to false after the search is complete or if an error occurred
      setIsLoading(false);
    }
  };

  // Return loading status, getUserProfile function, user details, and setUser function for external use
  return { isLoading, getUserProfile, user, setUser };
};

// Export the useSearchUser hook for use in other components
export default useSearchUser;
