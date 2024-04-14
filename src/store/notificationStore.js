import {create} from 'zustand';
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    updateDoc,
    getDoc,
} from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";

const useNotificationStore = create((set) => ({
    notifications: [],
    addNotification: async (notification) => {
        try {
          const docRef = await addDoc(collection(firestore, "notifications"), {
            ...notification,
            isShown: false,
          });
          console.log("Notification saved to Firestore with ID:", docRef.id);
  
          set((state) => ({
            notifications: [...state.notifications, { ...notification, isShown: false, id: docRef.id }]
          }));
        } catch (error) {
          console.error("Failed to save notification to Firestore:", error);
        }
      },
    markNotificationAsShown: async (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map(notification =>
            notification.id === notificationId ? { ...notification, isShown: true } : notification
          )
        }));
        const notificationDocRef = doc(firestore, "notifications", notificationId);
        await updateDoc(notificationDocRef, {
          isShown: true
        });
    },
    clearShownNotifications: () =>
      set((state) => ({
        notifications: state.notifications.filter(notification => !notification.isShown)
      }))
  }));

export default useNotificationStore;
