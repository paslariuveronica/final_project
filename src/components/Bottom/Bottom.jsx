import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./Bottom.module.css";

export function Bottom() {
  return (
    <div className={styles["socialmedia"]}>
      <p className={styles["title"]}>STAY IN TOUCH WITH US</p>
      <div className={styles["icon"]}>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebookF} style={{ color: "#ffffff" }} />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} style={{ color: "#ffffff" }} />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faYoutube} style={{ color: "#ffffff" }} />
        </a>
      </div>
    </div>
  );
}
