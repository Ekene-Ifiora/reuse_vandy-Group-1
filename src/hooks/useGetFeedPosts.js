// Import React hooks and functions from external files and Firebase SDK
import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

// Define a custom React hook named useGetFeedPosts
const useGetFeedPosts = () => {
  // State variable to manage loading status and access to posts in the store
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();

  // Access user information and update functions from custom stores
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const { setUserProfile } = useUserProfileStore();

  // useEffect to fetch feed posts when the authUser changes
  useEffect(() => {
    // Define an asynchronous function to fetch feed posts
    const getFeedPosts = async () => {
      // Set loading state to true before starting the fetch
      setIsLoading(true);

      // Create a Firestore query to get all posts
      const q = query(collection(firestore, "posts"));

      try {
        // Fetch posts from Firestore using the query
        const querySnapshot = await getDocs(q);

        // Initialize an array to store the fetched feed posts
        const feedPosts = [];

        // Iterate through the query snapshot and populate the feedPosts array
        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });

        // Sort feedPosts based on createdAt timestamp in descending order
        feedPosts.sort((a, b) => b.createdAt - a.createdAt);

        // Update the global posts state with the fetched feed posts
        setPosts(feedPosts);
      } catch (error) {
        // Show an error toast if an error occurs during the fetch process
        showToast("Error", error.message, "error");
      } finally {
        // Set loading state back to false after the fetch is complete or if an error occurred
        setIsLoading(false);
      }
    };

    // Check if there is an authenticated user before fetching feed posts
    if (authUser) getFeedPosts();
  }, [authUser, showToast, setPosts, setUserProfile]);

  // Return loading state and the fetched feed posts for external use
  return { isLoading, posts };
};

// Export the useGetFeedPosts hook for use in other components
export default useGetFeedPosts;
