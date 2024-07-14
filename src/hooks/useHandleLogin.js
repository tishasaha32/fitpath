import { useCallback, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import useCheckEmailExists from "./useCheckEmailExists";
import { IoIosWarning } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";

const useHandleLogin = () => {
  const [message, setMessage] = useState("");
  const [icon, setIcon] = useState();
  const checkEmailExists = useCheckEmailExists();

  const handleLogin = useCallback(
    async (email, password) => {
      try {
        const emailExists = await checkEmailExists(email);
        if (!emailExists) {
          setIcon(IoIosWarning);
          setMessage("Email does not exist");
          return;
        }
        await signInWithEmailAndPassword(auth, email, password);
        setIcon(FaCircleCheck);
        setMessage("Login Successful");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } catch (error) {
        setIcon(IoIosWarning);
        setMessage("Invalid email or password");
      }
    },
    [checkEmailExists]
  );

  return { handleLogin, message, icon };
};

export default useHandleLogin;
