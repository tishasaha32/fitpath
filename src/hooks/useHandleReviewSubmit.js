import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { db } from "../firebase/config";
import { useGetUserData } from "./useGetUserDetails";

function useHandleReviewSubmit({ reviewText, setReviewText, docId }) {
  const userDetails = useGetUserData();
  const handleReviewSubmit = async () => {
    if (reviewText.trim()) {
      try {
        await addDoc(collection(db, "reviews"), {
          userId: userDetails.uid,
          userName: userDetails.fullName,
          recipeId: docId,
          review: reviewText,
        });
        setReviewText("");
      } catch (error) {
        console.error("Error adding review: ", error);
        alert("Failed to submit review. Please try again.");
      }
    }
  };

  return { handleReviewSubmit };
}

export default useHandleReviewSubmit;
