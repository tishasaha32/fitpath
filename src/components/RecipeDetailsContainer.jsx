import React from "react";
import styles from "./RecipeDetailsContainer.module.css";

function RecipeDetailsContainer({ setRecipeDetailTab, recipeDetailTab }) {
  return (
    <div className={styles.recipeDetailsContainer}>
      <h3
        className={recipeDetailTab === "ingredients" ? styles.activeTab : ""}
        onClick={() => setRecipeDetailTab("ingredients")}
      >
        Ingredients
      </h3>
      <h3
        className={recipeDetailTab === "recipe" ? styles.activeTab : ""}
        onClick={() => setRecipeDetailTab("recipe")}
      >
        Recipe
      </h3>
      <h3
        className={recipeDetailTab === "reviews" ? styles.activeTab : ""}
        onClick={() => setRecipeDetailTab("reviews")}
      >
        Reviews
      </h3>
    </div>
  );
}

export default RecipeDetailsContainer;
