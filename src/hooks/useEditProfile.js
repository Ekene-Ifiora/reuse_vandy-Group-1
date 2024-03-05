// Import necessary dependencies and hooks from React and Firebase
import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

// Define the useEditProfile hook
const useEditProfile = () => {
  // Initialize state for tracking whether the profile update is in progress
  const [isUpdating, setIsUpdating] = useState(false);

  // Access user information and update functions from custom stores
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  // Access the showToast function from the useShowToast hook
  const showToast = useShowToast();

  // Define the editProfile function for updating user profiles
  const editProfile = async (inputs, selectedFile) => {
    // Check if an update is already in progress or if there is no authenticated user
    if (isUpdating || !authUser) return;
    
    // Set the updating state to true to prevent concurrent updates
    setIsUpdating(true);

    // Create references to Firebase storage and Firestore document
    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    const userDocRef = doc(firestore, "users", authUser.uid);

    // Initialize a variable to store the profile picture URL
    let URL = "";
    
    try {
      // Upload the selected file to Firebase storage and get the download URL
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }

      // Create an updated user object with the provided inputs or fallback to the existing values
      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
      };

      // Update the Firestore document with the new user data
      await updateDoc(userDocRef, updatedUser);

      // Update local storage with the updated user information
      localStorage.setItem("user-info", JSON.stringify(updatedUser));

      // Update the user information in the custom stores
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);

      // Show a success toast message
      showToast("Success", "Profile updated successfully", "success");
    } catch (error) {
      // Show an error toast message if an error occurs during the update process
      showToast("Error", error.message, "error");
    } finally {
      // Set the updating state back to false after the update is complete or if an error occurred
      setIsUpdating(false);
    }
  };

  // Return the editProfile function and the isUpdating state for external use
  return { editProfile, isUpdating };
};

// Export the useEditProfile hook for use in other components
export default useEditProfile;
