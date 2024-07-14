import React from "react";
import Mealcategories from "../components/MealCategories";
import BottomNavbar from "../common/BottomNavbar";
import Header from "../common/Header";

function Recipes() {
  return (
    <div>
      <Header />
      <Mealcategories />
      <BottomNavbar />
    </div>
  );
}

export default Recipes;
