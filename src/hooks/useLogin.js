// Import necessary functions and hooks from external libraries and files
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

// Define a custom React hook named useLogin
const useLogin = () => {
  // Access the showToast function from the useShowToast hook
  const showToast = useShowToast();

  // Destructure the signInWithEmailAndPassword hook from react-firebase-hooks/auth
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);

  // Access the loginUser function from the useAuthStore hook
  const loginUser = useAuthStore((state) => state.login);

  // Define the login function for user authentication
  const login = async (inputs) => {
    // Check if email and password are provided; show an error toast if not
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "Please fill all the fields", "error");
    }

    try {
      // Attempt to sign in with the provided email and password
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      // If sign-in is successful, retrieve user data from Firestore and update local storage and state
      if (userCred) {
        // Create a Firestore document reference for the user
        const docRef = doc(firestore, "users", userCred.user.uid);

        // Get the document snapshot for the user from Firestore
        const docSnap = await getDoc(docRef);

        // Update local storage with the user data
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));

        // Update the global authentication state with the user data
        loginUser(docSnap.data());
      }
    } catch (error) {
      // If an error occurs during authentication, show an error toast and log the user's email to the console
      console.log(inputs.email);
      showToast("Error", error.message, "error");
    }
  };

  // Return loading, error, and login functions for external use
  return { loading, error, login };
};

// Export the useLogin hook for use in other components
export default useLogin;
