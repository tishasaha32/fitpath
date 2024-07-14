import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDf2cU9ON-bXGTNSGdOsXGpTzjhSNSe7Fs",
  authDomain: "fitpath-c3d76.firebaseapp.com",
  projectId: "fitpath-c3d76",
  storageBucket: "fitpath-c3d76.appspot.com",
  messagingSenderId: "313184476595",
  appId: "1:313184476595:web:539ac1ea3fe7f94e537fc6",
  measurementId: "G-TY8YB9M0VW",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
