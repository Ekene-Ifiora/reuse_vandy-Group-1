import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleAuth = ({ prefix }) => {
  // Custom hook for handling Google authentication
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);

  // Custom hook for displaying toasts
  const showToast = useShowToast();

  // Custom hook for handling user authentication state
  const loginUser = useAuthStore((state) => state.login);

  // Function to handle Google authentication
  const handleGoogleAuth = async () => {
    try {
      // Sign in with Google
      const newUser = await signInWithGoogle();

      // Handle errors
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      // Check if the user exists in the Firestore database
      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      // If user exists, log in; otherwise, sign up
      if (userSnap.exists()) {
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        // Add user to Firestore
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

        // Save user info to local storage and log in
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    // Google authentication button
    <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
      <Image src='/google.png' w={5} alt='Google logo' />
      <Text mx='2' color={"blue.500"}>
        {prefix} with Google
      </Text>
    </Flex>
  );
};

export default GoogleAuth;
