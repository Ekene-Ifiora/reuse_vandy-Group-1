// Import React hooks and functions from external files and Firebase SDK
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

// Define a custom React hook named useGetSuggestedUsers
const useGetSuggestedUsers = () => {
  // State variables to manage loading status and store suggested user data
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  // Access user information and update functions from custom stores
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  // useEffect to fetch suggested users when the authUser changes
  useEffect(() => {
    // Define an asynchronous function to fetch suggested users
    const getSuggestedUsers = async () => {
      // Set loading state to true before starting the fetch
      setIsLoading(true);

      try {
        // Create a Firestore collection reference for the 'users' collection
        const usersRef = collection(firestore, "users");

        // Create a Firestore query to get suggested users
        const q = query(
          usersRef,
          // Exclude the current user and users the current user is already following
          where("uid", "not-in", [authUser.uid, ...authUser.following]),
          // Order the results by user ID
          orderBy("uid"),
          // Limit the results to 3 users
          limit(3)
        );

        // Fetch suggested users from Firestore using the query
        const querySnapshot = await getDocs(q);

        // Initialize an array to store the fetched suggested users
        const users = [];

        // Iterate through the query snapshot and populate the users array
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });

        // Update the local state with the fetched suggested users
        setSuggestedUsers(users);
      } catch (error) {
        // Show an error toast if an error occurs during the fetch process
        showToast("Error", error.message, "error");
      } finally {
        // Set loading state back to false after the fetch is complete or if an error occurred
        setIsLoading(false);
      }
    };

    // Check if there is an authenticated user before fetching suggested users
    if (authUser) getSuggestedUsers();
  }, [authUser, showToast]);

  // Return loading state and the fetched suggested users for external use
  return { isLoading, suggestedUsers };
};

// Export the useGetSuggestedUsers hook for use in other components
export default useGetSuggestedUsers;
