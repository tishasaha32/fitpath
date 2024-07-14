import { useCallback, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { IoIosWarning } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import useCheckEmailExists from "./useCheckEmailExists";
import useCheckPassword from "./useCheckPassword";

const useHandleRegister = () => {
  const [message, setMessage] = useState("");
  const [icon, setIcon] = useState();
  const checkEmailExists = useCheckEmailExists();
  const checkPassword = useCheckPassword();

  const handleRegister = useCallback(
    async (fullName, email, password, phoneNumber) => {
      try {
        const userExists = await checkEmailExists(email);
        if (userExists) {
          setIcon(IoIosWarning);
          setMessage("User already exists");
          return;
        }

        if (!checkPassword(password)) {
          setIcon(IoIosWarning);
          setMessage("Password must be at least 6 characters long");
          return;
        }

        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (res?.user) {
          await setDoc(doc(db, "users", res?.user.uid), {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            admin: false,
            uid: res?.user.uid,
          });
        }

        setIcon(FaCircleCheck);
        setMessage("Registration successful");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } catch (error) {
        setMessage("Error during registration");
        throw error;
      }
    },
    [checkEmailExists, checkPassword]
  );
  return { handleRegister, message, icon };
};

export default useHandleRegister;
