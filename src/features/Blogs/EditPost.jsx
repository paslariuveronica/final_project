import React, { useState, useEffect } from "react";
import { GlobalMessage } from "../../components/GlobalMessage/GlobalMessage";
import { useAuthContext } from "../Auth/AuthContext";
import { useParams } from "react-router-dom";
import styles from "./EditPost.module.css";

export function EditPost() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const { token } = useAuthContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [poster, setPoster] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [postUpdated, setPostUpdated] = useState(false);

  useEffect(() => {
    async function getPost() {
      const data = await fetch(`http://localhost:3000/posts/${postId}`).then(
        (res) => res.json()
      );
      setPost(data);
      setTitle(data.title);
      setContent(data.content);
      setPoster(data.poster);
    }
    getPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = { title, content, poster };
    await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPost),
    });

    setPost({ ...post, title, content, poster });
    setEditMode(false);
    setPostUpdated(true);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handlePostUpdated = () => {
    setPostUpdated(false);
  };

  return (
    <>
      {post && (
        <div>
          {editMode ? (
            <div className={styles["edit"]}>
              {token ? (
                <form
                  className={`${styles["form"]} ${styles["zebra-background"]}`}
                  onSubmit={handleSubmit}
                >
                  <label className={styles["newtitle"]}>Title:</label>
                  <input
                    className={styles["input"]}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label className={styles["newcontent"]}>Content:</label>
                  <textarea
                    className={styles["size"]}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <label className={styles["newposter"]}>Poster:</label>
                  <input
                    className={styles["input"]}
                    type="text"
                    value={poster}
                    onChange={(e) => setPoster(e.target.value)}
                  />
                  <button className={styles["button-save"]} type="submit">
                    Save
                  </button>
                </form>
              ) : (
                <GlobalMessage type="error">
                  You must be logged in to edit this.
                </GlobalMessage>
              )}
            </div>
          ) : (
            <div className={styles["post"]}>
              <h3 className={styles["title"]}>{post.title}</h3>
              <p className={styles["content"]}>{post.content}</p>
              {post.poster && (
                <img
                  className={styles["poster"]}
                  src={post.poster}
                  alt="Poster"
                />
              )}
              <button
                className={styles["button-edit"]}
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      )}
      {postUpdated && (
        <GlobalMessage
          type="success"
          onMessageClosed={() => setPostUpdated(false)}
        >
          Post updated.
        </GlobalMessage>
      )}
    </>
  );
}
