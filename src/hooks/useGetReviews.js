import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

function useGetReviews({ docId, reviewText }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsRef = collection(db, "reviews");
      const querySnapshot = await getDocs(reviewsRef);
      const reviewsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const requiredReviews = reviewsList.filter(
        (review) => review.recipeId === docId
      );
      setReviews(requiredReviews);
    };

    fetchReviews();
  }, [docId, reviewText]);
  return { reviews };
}

export default useGetReviews;
