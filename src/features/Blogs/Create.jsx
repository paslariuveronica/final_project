import { useState, useEffect } from "react";
import { useAuthContext } from "../Auth/AuthContext";
import { GlobalMessage } from "../../components/GlobalMessage/GlobalMessage";
import styles from "./Create.module.css";
import { useNavigate } from "react-router-dom";

export function Create() {
  const { token } = useAuthContext();
  const [newPost, setNewPost] = useState({
    id: 0,
    title: "",
    poster: "",
    content: "",
  });
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.poster || !newPost.content) {
      setMessageType("error");
      setMessageText("You must fill all fields to post");
      setShowMessage(true);
    } else if (!token) {
      setMessageType("error");
      setMessageText("You must be logged in to publish");
      setShowMessage(true);
    } else {
      fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      })
        .then((res) => res.json())
        .then((post) => {
          setNewPost({ id: 0, title: "", poster: "", content: "" });
          setMessageType("success");
          setMessageText("Post published");
          setShowMessage(true);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleOnMessageClosed = () => {
    setShowMessage(false);
  };

  return (
    <div className={styles["create"]}>
      <form
        className={`${styles["form"]} ${styles["zebra-background"]}`}
        onSubmit={handleCreatePost}
      >
        <h3 className={styles["write"]}>Write something</h3>
        <label className={styles["title"]}>
          Title:
          <input
            className={styles["input"]}
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
          />
        </label>
        <label className={styles["poster"]}>
          Poster URL:
          <input
            className={styles["input"]}
            type="text"
            name="poster"
            value={newPost.poster}
            onChange={handleInputChange}
          />
        </label>
        <label className={styles["content"]}>
          Tell your story:
          <textarea
            className={styles["input"]}
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
          />
        </label>
        <button className={styles["button"]} type="submit">
          Publish
        </button>
      </form>
      <GlobalMessage type={messageType} onMessageClosed={handleOnMessageClosed}>
        {messageText}
      </GlobalMessage>
    </div>
  );
}
