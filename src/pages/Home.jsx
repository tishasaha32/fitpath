import React from "react";
import Header from "../common/Header";
import BottomNavbar from "../common/BottomNavbar";
import useGetBlogs from "../hooks/useGetBlogs";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  const { blogs } = useGetBlogs();

  return (
    <div>
      <Header />
      <div className={styles.blogsContainer}>
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={styles.blogContainer}>
              <img
                src={blog.blogImage}
                alt="blog"
                className={styles.blogImage}
              />
              <h3 className={styles.blogTitle}>{blog.blogTitle}</h3>
              <p
                className={styles.blogBody}
                dangerouslySetInnerHTML={{
                  __html: blog.blogBody.slice(0, 100) + "...",
                }}
              />
            </div>
          </Link>
        ))}
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Home;
