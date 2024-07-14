import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

function useGetBlog({ docId }) {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogsCollection = collection(db, "blogs");
        const blogsSnapshot = await getDocs(blogsCollection);
        const blogsList = blogsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const requiredBlog = blogsList.find((blog) => blog.id === docId);
        setBlog(requiredBlog);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      }
    };

    getBlogs();
  }, []);

  return { blog };
}

export default useGetBlog;
