import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useLikePost = () => {
	const [isUpdating, setIsUpdating] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	// const [likes, setLikes] = useState(post.likes.length);
	// const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));
	const showToast = useShowToast();

	const handleAddCart = async (post) => {
		if (isUpdating) return;
		if (!authUser) return showToast("Error", "You must be logged in to like a post", "error");
		setIsUpdating(true);

		try {
			console.log(post);
			//const postRef = doc(firestore, "posts", post.id);
			// await updateDoc(postRef, {
			// 	likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
			// });

			// setIsLiked(!isLiked);
			//isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
			showToast("Success", "Added to Cart Successfully","success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsUpdating(false);
		}
	};

	return { handleAddCart, isUpdating };
	//return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
