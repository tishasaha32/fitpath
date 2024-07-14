import React from "react";
import { useParams } from "react-router-dom";
import useGetBlog from "../hooks/useGetBlog";
import styles from "./FullBlogBody.module.css";
import Header from "../common/Header";

function FullBlogBody() {
  const { id } = useParams();
  const blog = useGetBlog({ docId: id });
  return (
    <div>
      <Header />
      <img src={blog.blog.blogImage} alt="blog" className={styles.blogImage} />
      <h2 className={styles.blogTitle}>{blog.blog.blogTitle}</h2>
      <p
        className={styles.blogBody}
        dangerouslySetInnerHTML={{ __html: blog.blog.blogBody }}
      />
    </div>
  );
}

export default FullBlogBody;
