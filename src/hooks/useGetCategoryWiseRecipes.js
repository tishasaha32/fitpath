import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";

function useGetCategoryWiseRecipes({ pathname, mealTime }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [mealCategory, setMealCategory] = useState("veg");
  useEffect(() => {
    const getRecipes = async () => {
      const recipesCollection = collection(db, "recipes");
      const recipesSnapshot = await getDocs(recipesCollection);
      const recipesList = recipesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllRecipes(recipesList);
      const filteredRecipes = recipesList.filter((recipe) => {
        return recipe.mealCategory === "veg" && recipe.mealTime === mealTime;
      });
      setRecipes(filteredRecipes);
    };
    getRecipes();
  }, []);

  const handleMealCategory = (category) => {
    setMealCategory(category);
    const filteredRecipes = allRecipes.filter((recipe) => {
      return recipe.mealCategory === category && recipe.mealTime === mealTime;
    });
    setRecipes(filteredRecipes);
  };
  return { recipes, handleMealCategory, mealCategory };
}

export default useGetCategoryWiseRecipes;
