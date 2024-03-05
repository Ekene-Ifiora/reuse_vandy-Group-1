// Import React hooks and functions from external files and Firebase SDK
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

// Define a custom React hook named useFollowUser
const useFollowUser = (userId) => {
	// State variables to manage update status and follow state
	const [isUpdating, setIsUpdating] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);

	// Access user information and update functions from custom stores
	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const { userProfile, setUserProfile } = useUserProfileStore();

	// Access the showToast function from the useShowToast hook
	const showToast = useShowToast();

	// Define the handleFollowUser function for following/unfollowing users
	const handleFollowUser = async () => {
		// Set the updating state to true to prevent concurrent updates
		setIsUpdating(true);

		try {
			// Create references to the current user and the user to follow/unfollow in Firestore
			const currentUserRef = doc(firestore, "users", authUser.uid);
			const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

			// Update the current user's following list based on the follow state
			await updateDoc(currentUserRef, {
				following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
			});

			// Update the user to follow/unfollow's followers list based on the follow state
			await updateDoc(userToFollowOrUnfollowRef, {
				followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
			});

			// Update local state, localStorage, and user profile based on the follow state
			if (isFollowing) {
				// Unfollow
				setAuthUser({
					...authUser,
					following: authUser.following.filter((uid) => uid !== userId),
				});
				if (userProfile)
					setUserProfile({
						...userProfile,
						followers: userProfile.followers.filter((uid) => uid !== authUser.uid),
					});

				localStorage.setItem(
					"user-info",
					JSON.stringify({
						...authUser,
						following: authUser.following.filter((uid) => uid !== userId),
					})
				);
				setIsFollowing(false);
			} else {
				// Follow
				setAuthUser({
					...authUser,
					following: [...authUser.following, userId],
				});

				if (userProfile)
					setUserProfile({
						...userProfile,
						followers: [...userProfile.followers, authUser.uid],
					});

				localStorage.setItem(
					"user-info",
					JSON.stringify({
						...authUser,
						following: [...authUser.following, userId],
					})
				);
				setIsFollowing(true);
			}
		} catch (error) {
			// Show an error toast message if an error occurs during the follow/unfollow process
			showToast("Error", error.message, "error");
		} finally {
			// Set the updating state back to false after the follow/unfollow is complete or if an error occurred
			setIsUpdating(false);
		}
	};

	// useEffect to check if the current user is already following the target user
	useEffect(() => {
		if (authUser) {
			const isFollowing = authUser.following.includes(userId);
			setIsFollowing(isFollowing);
		}
	}, [authUser, userId]);

	// Return the isUpdating state, isFollowing state, and the handleFollowUser function for external use
	return { isUpdating, isFollowing, handleFollowUser };
};

// Export the useFollowUser hook for use in other components
export default useFollowUser;
