import useShowToast from "./useShowToast";
import { auth } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

// Define a custom React hook named useLogin
const useForgotPassword = (e) => {
  // Access the showToast function from the useShowToast hook
  const showToast = useShowToast();

  // Define the login function for user authentication
  const forgotPass = async (inputs, e) => {
    console.log("Got in the useFile");
    // Check if email and password are provided; show an error toast if not
    if (!inputs.email || !validateEmail(inputs.email)) {
      return showToast("Error", "Please provide a valid email", "error");
    }

    try {
      e.preventDefault();
      sendPasswordResetEmail(auth, inputs.email).then((data) => {});
      showToast("Info", "Check email for password reset link", "info");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // Return forgotPass functions for external use
  return { forgotPass };
};

// Export the useLogin hook for use in other components
export default useForgotPassword;
