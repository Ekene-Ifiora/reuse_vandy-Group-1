// Import React hooks and functions from external files and Firebase SDK
import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

// Define a custom React hook named usePostComment
const usePostComment = () => {
  // State variable to manage commenting status
  const [isCommenting, setIsCommenting] = useState(false);

  // Access the showToast function from the useShowToast hook, user authentication data, and the addComment function from the post store
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);

  // Function to handle posting a comment on a post
  const handlePostComment = async (postId, comment) => {
    // Return if a comment is already in progress
    if (isCommenting) return;

    // Return an error toast if the user is not logged in
    if (!authUser) return showToast("Error", "You must be logged in to comment", "error");

    // Set commenting state to true before starting the comment process
    setIsCommenting(true);

    // Create a new comment object with relevant information
    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };

    try {
      // Update the post document in Firestore to add the new comment to the comments array
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(newComment),
      });

      // Call the addComment function from the post store to update the local state with the new comment
      addComment(postId, newComment);
    } catch (error) {
      // Show an error toast if an error occurs during the comment process
      showToast("Error", error.message, "error");
    } finally {
      // Set commenting state back to false after the comment is complete or if an error occurred
      setIsCommenting(false);
    }
  };

  // Return commenting status and the handlePostComment function for external use
  return { isCommenting, handlePostComment };
};

// Export the usePostComment hook for use in other components
export default usePostComment;
