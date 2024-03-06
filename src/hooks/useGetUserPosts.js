// Import React hooks and functions from external files and Firebase SDK
import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

// Define a custom React hook named useGetUserPosts
const useGetUserPosts = () => {
  // State variables to manage loading status and store user posts
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();

  // Access user profile information and update functions from custom stores
  const showToast = useShowToast();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  // useEffect to fetch user-specific posts when the userProfile changes
  useEffect(() => {
    // Define an asynchronous function to fetch user-specific posts
    const getPosts = async () => {
      // Return if userProfile is not available
      if (!userProfile) return;

      // Set loading state to true before starting the fetch
      setIsLoading(true);
      // Clear existing posts in the local state
      setPosts([]);

      try {
        // Create a Firestore query to get posts created by the user
        const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));

        // Fetch user-specific posts from Firestore using the query
        const querySnapshot = await getDocs(q);

        // Initialize an array to store the fetched user-specific posts
        const fetchedPosts = [];

        // Iterate through the query snapshot and populate the fetchedPosts array
        querySnapshot.forEach((doc) => {
          fetchedPosts.push({ ...doc.data(), id: doc.id });
        });

        // Sort user-specific posts based on createdAt timestamp in descending order
        fetchedPosts.sort((a, b) => b.createdAt - a.createdAt);

        // Update the local state with the fetched user-specific posts
        setPosts(fetchedPosts);
      } catch (error) {
        // Show an error toast if an error occurs during the fetch process and clear existing posts
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        // Set loading state back to false after the fetch is complete or if an error occurred
        setIsLoading(false);
      }
    };

    // Call the getPosts function when the userProfile changes
    getPosts();
  }, [setPosts, userProfile, showToast]);

  // Return loading state and the fetched user-specific posts for external use
  return { isLoading, posts };
};

// Export the useGetUserPosts hook for use in other components
export default useGetUserPosts;
