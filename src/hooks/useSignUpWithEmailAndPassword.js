// Import React Firebase hooks and functions, as well as local dependencies
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

// Define a custom React hook named useSignUpWithEmailAndPassword
const useSignUpWithEmailAndPassword = () => {
  // Access the useCreateUserWithEmailAndPassword function from Firebase
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // Access the showToast function for displaying toasts
  const showToast = useShowToast();

  // Access the loginUser function from the authStore for setting user state after signup
  const loginUser = useAuthStore((state) => state.login);

  // Function to handle user signup with email and password
  const signup = async (inputs) => {
    // Validate that all required fields are filled
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.fullName
    ) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    // Reference to the 'users' collection in Firestore
    const usersRef = collection(firestore, "users");

    // Query to check if the provided username already exists
    const q = query(usersRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);

    // Show an error toast if the username already exists
    if (!querySnapshot.empty) {
      showToast("Error", "Username already exists", "error");
      return;
    }

    try {
      // Create a new user with the provided email and password
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      // Check if user creation was successful and handle errors
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      // If user creation was successful
      if (newUser) {
        // Create a user document with initial data
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          chats: [],
          friends: [],
          createdAt: Date.now(),
          cart: [],
          isAdmin: false,
        };

        // Set the user document in Firestore
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

        //verify the user email
        await sendEmailVerification(newUser.user);

        // Save user information to local storage
        localStorage.setItem("user-info", JSON.stringify(userDoc));

        // Log in the user by updating the global state
        loginUser(userDoc);
      }
    } catch (error) {
      // Show an error toast if an error occurs during signup
      showToast("Error", error.message, "error");
    }
  };

  // Return loading status, error, and signup function for external use
  return { loading, error, signup };
};

// Export the useSignUpWithEmailAndPassword hook for use in other components
export default useSignUpWithEmailAndPassword;
