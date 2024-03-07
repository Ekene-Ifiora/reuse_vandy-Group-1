import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const useAddCart = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  const handleAddCart = async (post) => {
    if (isUpdating) return;
    if (!authUser)
      return showToast(
        "Error",
        "You must be logged in to add to cart",
        "error"
      );
    setIsUpdating(true);

    try {
      // Query to find the user document based on the username
      const q = query(
        collection(firestore, "users"),
        where("username", "==", authUser.username)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty)
        return showToast("Error", "User not found", "error");

      // Loop through the query snapshot (though there should be only one user with a unique username)
      querySnapshot.forEach(async (item) => {
        try {
          const userRef = doc(firestore, "users", item.id);
          const userSnap = await getDoc(userRef);
          //   Check if the post ID already exists in the user's cart
          if (userSnap.data().cart.includes(post.id)) {
            showToast("Info", "Item already exists in the cart", "info");
          } else {
            // If not, add the post ID to the user's cart array
            await updateDoc(userRef, {
              cart: arrayUnion(post.id),
            });

            showToast("Success", "Added to Cart Successfully", "success");
          }
        } catch (error) {
          showToast("Error", error.message, "error");
        }
      });
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { handleAddCart, isUpdating };
};

export default useAddCart;
