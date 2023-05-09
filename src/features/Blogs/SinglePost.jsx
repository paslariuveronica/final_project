import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./SinglePost.module.css";
import { useAuthContext } from "../Auth/AuthContext"; 

export function SinglePost() {
  const { token } = useAuthContext();
  const [post, setPost] = useState(null);
  const [showMessage, setShowMessage] = useState(false); 
  const [messageType, setMessageType] = useState(''); 
  const [messageContent, setMessageContent] = useState(''); 
  const { postId } = useParams();

  useEffect(() => {
    async function getPost() {
      const data = await fetch(`http://localhost:3000/posts/${postId}`).then(
        (res) => res.json()
      );
      setPost(data);
    }
    getPost();
  }, [postId]);

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${token}` 
      }
    });
    setShowMessage(true);
    setMessageType('success');
    setMessageContent('Post deleted successfully.');
  }
  
  const handleMessageClosed = () => {
    setShowMessage(false);
    setMessageType('');
    setMessageContent('');
  };

  return (
    <div>
      <div className={styles["post"]}>
        <h2 className={styles["title"]}>{post?.title}</h2>
        <img
          className={styles["poster"]}
          src={post?.poster}
          alt={post?.title}
        />
        <p className={styles["content"]}>{post?.content}</p>

        <div>
          <Link to={`/posts/${postId}/edit`}>
            <button className={styles["button-edit"]}>Edit</button>
          </Link>
          <Link to={`/posts/${postId}/delete`}>
            <button className={styles["button-delete"]} onClick={handleDelete}>
              Delete
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
