// Import React hooks and functions from external files and Firebase SDK
import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

// Define a custom React hook named useSearchProduct
const useSearchProduct = () => {
  // State variables to manage loading status, item details, and access to showToast function
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItem] = useState([]);
  const showToast = useShowToast();

  // Function to get details of a product/item based on its name
  const getItemDetails = async (itemName) => {
    // Set loading state to true before starting the search
    setIsLoading(true);

    // Clear previous item details
    setItem([]);

    try {
      // Initialize an empty array to store matching items
      const matchItems = [];
      itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);

      if (!itemName.trim()) {
        // If the search field is empty, clear the items and return
        setItem([]);
        setIsLoading(false); // Set loading state back to false
        return;
      }

      // Define the queries for searching by name and tags
      const q1 = query(
        collection(firestore, "posts"),
        where("name", "==", itemName)
      );
      const q2 = query(
        collection(firestore, "posts"),
        where("tags", "==", itemName)
      );
      const q3 = query(
        collection(firestore, "posts"),
        where("sellerName", "==", itemName)
      );
      const q4 = query(
        collection(firestore, "posts"),
        where("location", "==", itemName)
      );

      // Execute the queries
      const querySnapshot1 = await getDocs(q1);
      const querySnapshot2 = await getDocs(q2);
      const querySnapshot3 = await getDocs(q3);
      const querySnapshot4 = await getDocs(q4);

      // Iterate through the snapshots and push matching items to the array
      querySnapshot1.forEach((doc) => matchItems.push(doc.data()));
      querySnapshot2.forEach((doc) => matchItems.push(doc.data()));
      querySnapshot3.forEach((doc) => matchItems.push(doc.data()));
      querySnapshot4.forEach((doc) => matchItems.push(doc.data()));

      // Show an error toast if no items are found with the given name
      if (matchItems.length === 0)
        return showToast("Error", "Item not found", "error");

      // Update the item state with the array of matching items
      setItem(matchItems);
    } catch (error) {
      // Show an error toast if an error occurs during the search process
      showToast("Error", error.message, "error");

      // Clear item details
      setItem([]);
    } finally {
      // Set loading state back to false after the search is complete or if an error occurred
      setIsLoading(false);
    }
  };

  // Return loading status, getItemDetails function, item details, and setItem function for external use
  return { isLoading, getItemDetails, items, setItem };
};

// Export the useSearchProduct hook for use in other components
export default useSearchProduct;
