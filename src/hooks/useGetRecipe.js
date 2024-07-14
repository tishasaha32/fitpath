import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";

function useGetRecipe({ docId }) {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const getRecipe = async () => {
      const recipesCollection = collection(db, "recipes");
      const recipesSnapshot = await getDocs(recipesCollection);
      const recipesList = recipesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const requiredRecipe = recipesList.find((recipe) => recipe.id === docId);
      setRecipe(requiredRecipe);
    };
    getRecipe();
  }, [docId]);
  return { recipe };
}

export default useGetRecipe;
