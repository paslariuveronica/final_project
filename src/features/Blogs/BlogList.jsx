import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BlogList.module.css";

export function BlogList() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function getPosts() {
      const data = await fetch("http://localhost:3000/posts").then((res) =>
        res.json()
      );
      setPosts(data);
    }
    getPosts();
  }, []);

  const handleDelete = async (postId) => {
    await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    setPosts(posts.filter((post) => post.id !== postId));
  };

  if (!posts) {
    return null;
  }
  return (
    <div className={styles["bloglist"]}>
      {posts.map((post) => (
        <div className={styles["post"]} key={post.id}>
          <h2 className={styles["title"]}>{post.title}</h2>
          <img
            className={styles["poster"]}
            src={post.poster}
            alt={post.title}
          />
          <p className={styles["content"]}>{post.content.split(". ")[0]}.</p>
          <Link to={`/posts/${post.id}`}>
            <button className={styles["button"]}>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
