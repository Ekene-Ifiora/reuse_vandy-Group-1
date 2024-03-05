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

const useSearchProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(null);
  const showToast = useShowToast();

  const getItemDetails = async (itemName) => {
    setIsLoading(true);
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
