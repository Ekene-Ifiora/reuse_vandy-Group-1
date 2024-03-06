// Import React hooks and functions from external files and Firebase SDK
import { useState } from "react";
import useShowToast from "./useShowToast";
import {
  collection,
  getDocs,
  query,
  where,
  union,
  orderBy,
  or,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

// Define a custom React hook named useSearchProduct
const useSearchProduct = () => {
  // State variables to manage loading status, item details, and access to showToast function
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(null);
  const showToast = useShowToast();

  // Function to get details of a product/item based on its name
  const getItemDetails = async (itemName) => {
    // Set loading state to true before starting the search
    setIsLoading(true);

    // Clear previous item details
    setItem(null);

    try {
      var q = [];
      const q1 = query(
        collection(firestore, "posts"),
        where("name", "==", itemName)
      );
      const q2 = query(
        collection(firestore, "posts"),
        where("tags", "==", itemName)
      );

      if (!q1.empty) {
        q = q1;
      } else if (!q2.empty) {
        console.log(itemName);
        q = q2;
      } else {
        q = [];
      }

      // Combine the queries using the logical OR operator
      q = q1.empty ? q2 : q1;

      const querySnapshot = await getDocs(q);

      // Show an error toast if no items are found with the given name
      if (querySnapshot.empty)
        return showToast("Error", "Item not found", "error");

      // Iterate through the query snapshot and update the item details with the first matching item
      querySnapshot.forEach((doc) => {
        setItem(doc.data());
      });
    } catch (error) {
      // Show an error toast if an error occurs during the search process
      showToast("Error", error.message, "error");

      // Clear item details
      setItem(null);
    } finally {
      // Set loading state back to false after the search is complete or if an error occurred
      setIsLoading(false);
    }
  };

  // Return loading status, getItemDetails function, item details, and setItem function for external use
  return { isLoading, getItemDetails, item, setItem };
};

// Export the useSearchProduct hook for use in other components
export default useSearchProduct;
