// Import React hooks and functions from external files and Firebase SDK
import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

// Define a custom React hook named useLikePost
const useLikePost = (post) => {
  // State variables to manage updating status, access user authentication data, and track post likes
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));

  // Access the showToast function from the useShowToast hook
  const showToast = useShowToast();

  // Function to handle liking or unliking a post
  const handleLikePost = async () => {
    // Return if an update is already in progress
    if (isUpdating) return;

    // Return an error toast if the user is not logged in
    if (!authUser) return showToast("Error", "You must be logged in to like a post", "error");

    // Set updating state to true before starting the update
    setIsUpdating(true);

    try {
      // Create a Firestore document reference for the post
      const postRef = doc(firestore, "posts", post.id);

      // Update the post's likes array in Firestore based on whether the user has already liked it
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      // Update local state to reflect the change in liking status and adjust the likes count
      setIsLiked(!isLiked);
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    } catch (error) {
      // Show an error toast if an error occurs during the update process
      showToast("Error", error.message, "error");
    } finally {
      // Set updating state back to false after the update is complete or if an error occurred
      setIsUpdating(false);
    }
  };

  // Return liking status, likes count, handleLikePost function, and updating status for external use
  return { isLiked, likes, handleLikePost, isUpdating };
};

// Export the useLikePost hook for use in other components
export default useLikePost;
