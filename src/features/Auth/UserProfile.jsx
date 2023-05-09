import { Link } from "react-router-dom";
import { useAuthContext } from "../../features/Auth/AuthContext";
import styles from "./UserProfile.module.css";

export function UserProfile() {
  const { user } = useAuthContext();
  return (
    <div className={`${styles["userprofile"]}`}>
      <h1 className={styles["title"]}>
        Hello {user.firstName}, this is your account info
      </h1>
      {user ? (
        <div className={`${styles["info"]}`}>
          <p>First name: {user.firstName}</p>
          <p>Last name: {user.lastName}</p>
          <p>Gender: {user.gender}</p>
          <p>Date of Birth: {user.dateOfBirth}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p></p>
      )}
      <Link to={`/user/${user.id}/update`}>
        <button className={styles["button"]}>Update</button>
      </Link>
    </div>
  );
}
