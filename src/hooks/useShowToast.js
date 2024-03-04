// Import React hook for displaying toasts and useCallback for function memoization
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

// Define a custom React hook named useShowToast
const useShowToast = () => {
  // Access the useToast function from Chakra UI
  const toast = useToast();

  // useCallback is used to prevent an infinite loop by caching the function
  const showToast = useCallback(
    // Function to display a toast with specified title, description, and status
    (title, description, status) => {
      // Call the useToast function to display the toast
      toast({
        title: title,
        description: description,
        status: status,
        duration: 3000, // Toast duration in milliseconds
        isClosable: true, // Allow users to close the toast
      });
    },
    [toast] // Dependency array to ensure the function is memoized with the toast function
  );

  // Return the showToast function for external use
  return showToast;
};

// Export the useShowToast hook for use in other components
export default useShowToast;
