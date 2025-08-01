
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VIIE_APIKEY,
  authDomain: import.meta.env.VIIE_AUTHDOMAIN,
  projectId: import.meta.env.VIIE_PROJECTID,
  storageBucket: import.meta.env.VIIE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VIIE_MESSAGINGSENDERID,
  appId: import.meta.env.VIIE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;