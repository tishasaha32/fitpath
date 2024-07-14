import React from "react";
import styles from "./RecipeImageTitleDescription.module.css";

function RecipeImageTitleDescription({ recipe }) {
  return (
    <div>
      <div className={styles.recipeImageContainer}>
        <img
          src={recipe.imageURL}
          alt="recipe"
          className={styles.recipeImage}
        />
      </div>
      <div className={styles.recipeTitleAndDescriptionContainer}>
        <h2>{recipe.recipeName} Recipe</h2>
        <p>
          Indulge in the delightful flavors of {recipe.recipeName} as your
          perfect {recipe.mealTime} with your loved ones.
        </p>
      </div>
    </div>
  );
}

export default RecipeImageTitleDescription;
