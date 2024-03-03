import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(null);
  const showToast = useShowToast();

  const getItemDetails = async (itemName) => {
    setIsLoading(true);
    setItem(null);
    try {
      const q = query(
        collection(firestore, "posts"),
        where("name", ">=", itemName)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty)
        return showToast("Error", "Item not found", "error");

      querySnapshot.forEach((doc) => {
        setItem(doc.data());
      });
    } catch (error) {
      showToast("Error", error.message, "error");
      setItem(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getItemDetails, item, setItem };
};

export default useSearchProduct;
