import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import usePostStore from "../store/postStore";


const useEditPost = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const posts = usePostStore((state) => state.posts);
  const authUser = useAuthStore((state) => state.user);
  const setPosts = usePostStore((state) => state.setPosts);

  const showToast = useShowToast();

  const editPost = async (post, inputs, selectedFile) => {
    if (isUpdating || !authUser) return;
    
    setIsUpdating(true);

    const storageRef = ref(storage, `posts/${post.id}`); 
    const postDocRef = doc(firestore, "posts", post.id);

    let URL = "";
    
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(ref(storage, `posts/${post.id}`));
      }

      const updatedPost = {
        ...post,
        buyNowPrice: inputs.buyNowPrice || post.buyNowPrice,
        description: inputs.description || post.description,
        imageURL: URL || post.imageURL,
        name: inputs.name || post.name,
      };

      await updateDoc(postDocRef, updatedPost); 

      const updatedPosts = posts.map((p) => {
        if (p.id === post.id) {
          return updatedPost; 
        }
        return p; 
      });

      setPosts(updatedPosts)

      showToast("Success", "Profile updated successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { editPost, isUpdating };
};

export default useEditPost;
