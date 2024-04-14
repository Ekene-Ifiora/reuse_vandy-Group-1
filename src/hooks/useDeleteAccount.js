import useShowToast from "./useShowToast";
import { firestore, auth } from "../firebase/firebase";
import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const useDeleteAccount = () => {
  const showToast = useShowToast();
  const navigate = useNavigate();

  const deleteAccount = async (user, e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        // Delete user's posts from Firestore
        const userPostsQuery = query(
          collection(firestore, "posts"),
          where("createdBy", "==", user.uid)
        );
        const userPostsSnapshot = await getDocs(userPostsQuery);

        userPostsSnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        // Delete the user from Firebase Authentication
        //await auth.currentUser.delete();

        // Delete the user's ID from the users collection
        const userRef = doc(firestore, "users", user.uid);
        await deleteDoc(userRef);

        showToast(
          "Success",
          `Successfully deleted ${user.fullName}'s account and associated posts`,
          "success"
        );

        // Redirect to login page after successful deletion
        navigate("/login");
      } catch (error) {
        showToast(
          "Error",
          `Failed to delete ${user.fullName}'s account: ${error.message}`,
          "error"
        );
      }
    } else {
      showToast("Info", `${user.fullName}'s account was not deleted`, "info");
    }
  };

  return { deleteAccount };
};

export default useDeleteAccount;
