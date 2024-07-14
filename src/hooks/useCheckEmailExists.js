import { useCallback } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const useCheckEmailExists = () => {
  const checkEmailExists = useCallback(async (email) => {
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking email existence:", error);
      throw error;
    }
  }, []);

  return checkEmailExists;
};

export default useCheckEmailExists;
