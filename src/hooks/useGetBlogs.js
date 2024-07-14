import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

function useGetBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogsCollection = collection(db, "blogs");
        const blogsSnapshot = await getDocs(blogsCollection);
        const blogsList = blogsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsList);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      }
    };

    getBlogs();
  }, []);

  return { blogs };
}

export default useGetBlogs;
