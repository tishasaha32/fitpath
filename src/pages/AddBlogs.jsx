import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./AddRecipe.module.css";
import { db, storage } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function AddBlogs() {
  const [blogTitle, setBLogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageURL = "";
      // Upload image to storage
      if (blogImage) {
        const imageRef = ref(storage, `blogs/${blogImage.name}`);
        await uploadBytes(imageRef, blogImage);
        imageURL = await getDownloadURL(imageRef);
      }
      const docRef = await addDoc(collection(db, "blogs"), {
        blogTitle,
        blogBody,
        blogImage: imageURL,
      });
      console.log("Document written with ID: ", docRef.id);

      // Clear form fields
      setBLogTitle("");
      setBlogBody("");
      setBlogImage("");
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
        placeholder="Blog Title"
        style={{
          width: "90vw",
          padding: "10px",
          border: "1px solid black",
          outline: "none",
        }}
        value={blogTitle}
        onChange={(e) => setBLogTitle(e.target.value)}
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
        onChange={(e) => setBlogImage(e.target.files[0])}
        required
        ref={fileInputRef}
      />
      <ReactQuill
        theme="snow"
        placeholder="Enter ingredients"
        value={blogBody}
        onChange={(value) => setBlogBody(value)}
        required
        className={styles.reactQuill}
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
        Add Blog
      </button>
    </form>
  );
}

export default AddBlogs;
