import React, { useState, useEffect } from "react";
import styles from "./Photo.module.css";

export function Photo() {
  const [photos, setPhotos] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function getPhoto() {
      const data = await fetch("http://localhost:3000/photo").then((res) =>
        res.json()
      );
      setPhotos(data);
    }
    getPhoto();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!photos) {
    return null;
  }

  return (
    <div className={styles["slider"]}>
      <div className={styles["photos"]}>
        <button className={styles["prev"]} onClick={handlePrevious}>
          Previous
        </button>
        <img
          className={styles["poster"]}
          src={photos[currentIndex].poster}
          alt={photos[currentIndex].title}
        />

        <button className={styles["next"]} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
