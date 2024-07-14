import { useCallback } from "react";
import { auth } from "../firebase/config";

const useLogout = () => {
  const logout = useCallback(async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, []);

  return logout;
};

export default useLogout;
