import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

// Define a custom React hook named useLogin
const useMakeAdmin = () => {
  // Access the showToast function from the useShowToast hook
  const showToast = useShowToast();

  const makeAdmin = async (user) => {
    if (window.confirm("Are you sure you want to make this user an Admin?")) {
      try {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);

        // Update the isAdmin field of the user document
        await updateDoc(userRef, {
          isAdmin: true,
        });

        showToast("Success", `${user.username} is now an Admin`, "success");
      } catch (error) {
        showToast(
          "Error",
          `Failed to make ${user.username} an Admin: ${error.message}`,
          "error"
        );
      }
    } else {
      showToast("Info", `${user.username} was not made an Admin`, "info");
    }
  };

  const unmakeAdmin = async (user) => {
    if (window.confirm("Are you sure you want to make this user an Admin?")) {
      try {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);

        // Update the isAdmin field of the user document
        await updateDoc(userRef, {
          isAdmin: false,
        });

        showToast("Success", `${user.username} is no more an Admin`, "success");
      } catch (error) {
        showToast(
          "Error",
          `Failed to remove ${user.username} 's Admin Status: ${error.message}`,
          "error"
        );
      }
    } else {
      showToast("Info", `${user.username} is still an Admin`, "info");
    }
  };

  return { makeAdmin, unmakeAdmin };
};

// Export the useLogin hook for use in other components
export default useMakeAdmin;
