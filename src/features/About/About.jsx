import { useEffect, useState } from "react";
import styles from "./About.module.css";

export function About() {
  const [about, setAbout] = useState(null);
  useEffect(() => {
    async function getAbout() {
      const data = await fetch("http://localhost:3000/about").then((res) =>
        res.json()
      );
      setAbout(data);
    }
    getAbout();
  }, []);
  if (!about) {
    return null;
  }
  return (
    <div className={styles["about"]}>
      {about.map((about) => (
        <div className={styles["post"]} key={about.id}>
          <h2 className={styles["title"]}>{about.title}</h2>
          <img
            className={styles["poster"]}
            src={about.poster}
            alt={about.title}
          />
          <p className={styles["content"]}>{about.content}</p>
          <p>Do not hezitate to contact me at: {about.contactme}</p>

          <div />
        </div>
      ))}
    </div>
  );
}
