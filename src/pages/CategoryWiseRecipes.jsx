import React from "react";
import styles from "./CategoryWiseRecipes.module.css";
import { Link } from "react-router-dom";
import useGetCategoryWiseRecipes from "../hooks/useGetCategoryWiseRecipes";
import Header from "../common/Header";
import BottomNavbar from "../common/BottomNavbar";

function CategoryWiseRecipes() {
  const pathname = window.location.pathname;
  const mealTime = pathname.split("/")[2];

  const { recipes, handleMealCategory, mealCategory } =
    useGetCategoryWiseRecipes({
      pathname,
      mealTime,
    });
  return (
    <div>
      <Header />
      <div className={styles.mealCategoriesContainer}>
        <p
          onClick={() => handleMealCategory("veg")}
          className={mealCategory === "veg" ? styles.activeCategory : ""}
        >
          Vegetarian
        </p>
        <p
          onClick={() => handleMealCategory("vegan")}
          className={mealCategory === "vegan" ? styles.activeCategory : ""}
        >
          Vegan
        </p>
        <p
          onClick={() => handleMealCategory("nonveg")}
          className={mealCategory === "nonveg" ? styles.activeCategory : ""}
        >
          Non-Vegetarian
        </p>
      </div>

      <div className={styles.recipesContainer}>
        {recipes?.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
            <div className={styles.recipeContainer}>
              <img
                src={recipe.imageURL}
                alt={recipe.recipeName}
                className={styles.recipeImage}
              />
              <div className={styles.overlay}> </div>
              <p className={styles.recipeName}>{recipe.recipeName}</p>
            </div>
          </Link>
        ))}
      </div>
      <BottomNavbar />
    </div>
  );
}

export default CategoryWiseRecipes;
