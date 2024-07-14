import React, { useState } from "react";
import styles from "./MealCategories.module.css";
import { Link } from "react-router-dom";

function Mealcategories() {
  const [mealCategories, setMealCategories] = useState([
    {
      id: 1,
      name: "Breakfast",
      image:
        "https://firebasestorage.googleapis.com/v0/b/fitpath-c3d76.appspot.com/o/recipe%20Page%2Faloo-paratha-gobi-paratha-also-known-as-potato-cauliflower-stuffed-flatbread-dish-originating-from-indian-subcontinent.jpg?alt=media&token=5f8e1ac0-e859-4086-9cc6-20695f9048e0",
      message:
        "A healthy breakfast includes a balance of protein to provide sustained energy.",
    },
    {
      id: 2,
      name: "Lunch",
      image:
        "https://firebasestorage.googleapis.com/v0/b/fitpath-c3d76.appspot.com/o/recipe%20Page%2Ffresh-gourmet-meal-beef-taco-salad-plate-generated-by-ai.jpg?alt=media&token=feed1ba9-3154-465e-912d-75c146a0de86",
      message:
        "A balanced lunch includes protein, healthy fats to support energy and well-being.",
    },
    {
      id: 3,
      name: "Dinner",
      image:
        "https://firebasestorage.googleapis.com/v0/b/fitpath-c3d76.appspot.com/o/recipe%20Page%2Findian-butter-chicken-black-bowl-wooden-table.jpg?alt=media&token=501c0b24-9fd8-4887-a699-2bbb8833b847",
      message:
        "Eating a nutritious dinner can support improve digestion and promote restful sleep.",
    },
  ]);
  return (
    <div className={styles.recipeMealCategoriesContainer}>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/fitpath-c3d76.appspot.com/o/recipe%20Page%2FRectangle%2083.png?alt=media&token=97e899ff-aff1-4b28-a0e7-8424d041bdad"
        className={styles.recipePageImage}
      />
      {mealCategories.map((mealCategory) => (
        <Link
          to={`/categories/${mealCategory.name}`}
          key={mealCategory.id}
          style={{ textDecoration: "none", color: "inherit" }}
          className={styles.mealCategoriesContainer}
        >
          <div className={styles.mealContainer}>
            <img src={mealCategory.image} className={styles.mealImage} />
            <div>
              <h3 className={styles.mealName}>{mealCategory.name}</h3>
              <p className={styles.message}>{mealCategory.message}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Mealcategories;
