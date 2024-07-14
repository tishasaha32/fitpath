import { useState, useEffect, useCallback } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useGetUserData = () => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = useCallback(async () => {
    console.log("******");
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserDetails(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data());
          setUserDetails(docSnap.data());
        }
      } else {
        setUserDetails(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return userDetails;
};
