import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/*const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};*/

const firebaseConfig = {
  apiKey: "AIzaSyDxqFwKAN9ODT_A7CaDwxTnCIqphxUp_ZA",
  authDomain: "insta-clone-v1-e1f66.firebaseapp.com",
  projectId: "insta-clone-v1-e1f66",
  storageBucket: "insta-clone-v1-e1f66.appspot.com",
  messagingSenderId: "61607030090",
  appId: "1:61607030090:web:44012c94d6a1f08c08e5b3",
  measurementId: "G-4LQ0DSPC8V",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
