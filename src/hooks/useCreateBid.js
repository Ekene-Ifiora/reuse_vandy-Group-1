import { firestore} from "../firebase/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { useState} from "react";
import bidStore from "../store/bidStore";
import usePostStore from "../store/postStore";
import { useLocation } from "react-router-dom";

const useCreateBid = () => {
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const createBid = bidStore((state) => state.createBid);
    const addBid = usePostStore((state) => state.addBid);
    const { pathname } = useLocation();
  
    const handleCreateBid = async (item, inputs) => {
      if (isLoading) return;
      inputs.item = item.id;
      inputs.createdBy = authUser.uid; 
      if (!inputs.bid) throw new Error("Please input bid amount");
  
      setIsLoading(true);
      const newBid = inputs;
  
      try {
        const bidDocRef = await addDoc(collection(firestore, "bids"), newBid);
        const postDocRef = doc(firestore, "posts", item.id);
  
        await updateDoc(postDocRef, { bids: arrayUnion({ ...newBid, id: bidDocRef.id }) });
  
        if (authUser.uid) {
          createBid({ ...newBid, id: bidDocRef.id });
          addBid(item.id, { ...newBid, id: bidDocRef.id })
        }
        showToast("Success", "Bid sent successfully", "success");
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    return { isLoading, handleCreateBid };
};

export default useCreateBid;