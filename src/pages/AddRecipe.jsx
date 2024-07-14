import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./AddRecipe.module.css";
import { db, storage } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function AddRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [diseaseCategory, setDiseaseCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [mealTime, setMealTime] = useState("");
  const [mealCategory, setMealCategory] = useState("");
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageURL = "";
      // Upload image to storage
      if (image) {
        const imageRef = ref(storage, `recipes/${image.name}`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
      }
      const docRef = await addDoc(collection(db, "recipes"), {
        recipeName,
        diseaseCategory,
        ingredients,
        instructions,
        imageURL,
        mealCategory,
        mealTime,
      });
      console.log("Document written with ID: ", docRef.id);

      // Clear form fields
      setRecipeName("");
      setDiseaseCategory("");
      setIngredients("");
      setInstructions("");
      setImage(null);
      setMealTime("");
      setMealCategory("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Recipe Name"
        style={{
          width: "90vw",
          padding: "10px",
          border: "1px solid black",
          outline: "none",
        }}
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
        required
      />
      <input
        type="file"
        placeholder="Upload Image"
        style={{
          width: "90vw",
          padding: "10px",
          border: "1px solid black",
          outline: "none",
        }}
        onChange={(e) => setImage(e.target.files[0])}
        required
        ref={fileInputRef}
      />
      <select
        name="diseaseCategory"
        style={{
          width: "90vw",
          padding: "10px",
          border: "1px solid black",
          outline: "none",
        }}
        value={diseaseCategory}
        onChange={(e) => setDiseaseCategory(e.target.value)}
        required
      >
        <option value="" disabled>
          Select Disease Category
        </option>
        <option value="PCOD-PCOS">PCOD-PCOS</option>
        <option value="THYROID">THYROID</option>
        <option value="OBESITY">OBESITY</option>
        <option value="DEPRESSION">DEPRESSION</option>
        <option value="DIABETES">DIABETES</option>
        <option value="UNDERWEIGHT">UNDERWEIGHT</option>
      </select>
      <select
        name="mealTime"
        style={{
          width: "90vw",
          padding: "10px",
          border: "1px solid black",
          outline: "none",
        }}
        value={mealTime}
        onChange={(e) => setMealTime(e.target.value)}
        required
      >
        <option value="" disabled>
          Select Meal Time
        </option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      <select
        name="mealCategory"
        style={{
          width: "90vw",
          padding: "10px",
          border: "1px solid black",
          outline: "none",
        }}
        value={mealCategory}
        onChange={(e) => setMealCategory(e.target.value)}
        required
      >
        <option value="" disabled>
          Select Meal Category
        </option>
        <option value="veg">Veg</option>
        <option value="vegan">Vegan</option>
        <option value="nonveg">Non Veg</option>
      </select>
      <ReactQuill
        theme="snow"
        placeholder="Enter ingredients"
        value={ingredients}
        onChange={(value) => setIngredients(value)}
        required
        className={styles.reactQuill}
      />
      <ReactQuill
        theme="snow"
        placeholder="Enter Recipe"
        value={instructions}
        className={styles.reactQuill}
        onChange={(value) => setInstructions(value)}
        required
      />

      <button
        style={{
          width: "90vw",
          padding: "10px",
          border: "1px solid black",
          outline: "none",
        }}
        type="submit"
      >
        Add Recipe
      </button>
    </form>
  );
}

export default AddRecipe;
