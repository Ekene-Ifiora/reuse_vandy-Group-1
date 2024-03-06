// Import React hooks and functions from external files
import { useState } from "react";
import useShowToast from "./useShowToast";

// Define a custom React hook named usePreviewImg
const usePreviewImg = () => {
  // State variable to store the selected image file
  const [selectedFile, setSelectedFile] = useState(null);

  // Access the showToast function from the useShowToast hook
  const showToast = useShowToast();

  // Define the maximum allowed file size for the image (2MB)
  const maxFileSizeInBytes = 2 * 1024 * 1024;

  // Function to handle changes in the selected image file
  const handleImageChange = (e) => {
    // Get the selected file from the input element
    const file = e.target.files[0];

    // Check if a file is selected and it is an image
    if (file && file.type.startsWith("image/")) {
      // Check if the file size is within the allowed limit (2MB)
      if (file.size > maxFileSizeInBytes) {
        // Show an error toast if the file size exceeds the limit
        showToast("Error", "File size must be less than 2MB", "error");

        // Clear the selected file and return
        setSelectedFile(null);
        return;
      }

      // Use FileReader to read the selected file as a data URL
      const reader = new FileReader();

      // Set up a callback for when the file reading is complete
      reader.onloadend = () => {
        // Update the selectedFile state with the data URL
        setSelectedFile(reader.result);
      };

      // Start reading the file as a data URL
      reader.readAsDataURL(file);
    } else {
      // Show an error toast if the selected file is not an image
      showToast("Error", "Please select an image file", "error");

      // Clear the selected file
      setSelectedFile(null);
    }
  };

  // Return the selectedFile state, handleImageChange function, and setSelectedFile function for external use
  return { selectedFile, handleImageChange, setSelectedFile };
};

// Export the usePreviewImg hook for use in other components
export default usePreviewImg;
