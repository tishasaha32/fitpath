import React, { useState } from "react";
import useGetRecipe from "../hooks/useGetRecipe";
import RecipeImageTitleDescription from "../components/RecipeImageTitleDescription";
import ReviewsContainer from "../components/ReviewsContainer";
import RecipeDetailsContainer from "../components/RecipeDetailsContainer";
import { useParams } from "react-router-dom";
import styles from "./FullBodyRecipe.module.css";

function FullRecipeBody() {
  const { id } = useParams();
  const [recipeDetailTab, setRecipeDetailTab] = useState("ingredients");
  const { recipe } = useGetRecipe({ docId: id });

  return (
    <div>
      <RecipeImageTitleDescription recipe={recipe} />
      <RecipeDetailsContainer
        setRecipeDetailTab={setRecipeDetailTab}
        recipeDetailTab={recipeDetailTab}
      />
      <div className={styles.recipeDetails}>
        {recipeDetailTab === "ingredients" && (
          <p
            className={styles.ingredients}
            dangerouslySetInnerHTML={{ __html: recipe.ingredients }}
          />
        )}
        {recipeDetailTab === "recipe" && (
          <p
            className={styles.recipe}
            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
          />
        )}
        {recipeDetailTab === "reviews" && <ReviewsContainer docId={id} />}
      </div>
    </div>
  );
}

export default FullRecipeBody;
