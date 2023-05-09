import React, { useState } from "react";
import { useAuthContext } from "../Auth/AuthContext";
import { GlobalMessage } from "../../components/GlobalMessage/GlobalMessage";
import { useParams, useNavigate } from "react-router-dom"; 
import styles from './DeletePost.module.css'

export function DeletePost() {
  const { postId } = useParams();
  const { token } = useAuthContext();
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!token) {
      setShowMessage(true);
      setMessageType("error");
      setMessageContent("You must be logged in to delete this post.");
    } else {
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setShowMessage(true);
      setMessageType("success");
      setMessageContent("Post deleted successfully.");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const handleMessageClosed = () => {
    setShowMessage(false);
    setMessageType("");
    setMessageContent("");
  };

  return (
    <div className={styles["delete"]}>
      <h1 className={styles["title"]}>
        Are you sure you want to delete this post?
      </h1>
      <button className={styles["button"]} onClick={handleDelete}>
        Yes, Delete
      </button>
      {showMessage && (
        <GlobalMessage type={messageType} onMessageClosed={handleMessageClosed}>
          {messageContent}
        </GlobalMessage>
      )}
    </div>
  );
}
