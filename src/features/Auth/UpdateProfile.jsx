import { useState } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState/useLocalStorageState";
import { GlobalMessage } from "../../components/GlobalMessage/GlobalMessage";
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./UpdateProfile.module.css";

export function UpdateProfile(userData) {
  const { user, updateUser } = useAuthContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    if (
      !email ||
      !firstName ||
      !lastName ||
      !newPassword ||
      !retypePassword ||
      !gender ||
      !phoneNumber ||
      !dateOfBirth
    ) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }
    if (newPassword !== retypePassword) {
      setMessage("New password and retype password don't match.");
      setMessageType("error");
      return;
    }

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        newPassword,
        gender,
        phoneNumber,
        dateOfBirth,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Profile updated successfully.");
          setMessageType("success");
          updateUser({
            firstName,
            lastName,
            email,
            gender,
            phoneNumber,
            dateOfBirth,
          });
          navigate("/user");
        } else {
          setMessage("Failed to update profile.");
          setMessageType("error");
        }
      })
      .catch((error) => {
        setMessage("Failed to update profile.");
        setMessageType("error");
      });
  };
  return (
    <div className={styles["edit"]}>
      <h1>Update Profile</h1>
      <form className={`${styles["form"]} ${styles["zebra-background"]}`}>
        <label className={styles["fn"]}>
          First Name:
          <input
            className={styles["input"]}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label className={styles["ln"]}>
          Last Name:
          <input
            className={styles["input"]}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label className={styles["gender"]}>
          Gender:
          <select
            className={styles["input"]}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label className={styles["dob"]}>
          Date of Birth:
          <input
            className={styles["input"]}
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </label>
        <label className={styles["email"]}>
          Email:
          <input
            className={styles["input"]}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={styles["phone"]}>
          Phone Number:
          <input
            className={styles["input"]}
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <label className={styles["password"]}>
          New Password:
          <input
            className={styles["input"]}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label className={styles["password"]}>
          Retype New Password:
          <input
            className={styles["input"]}
            type="password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
          />
        </label>
        <button
          className={styles["button-save"]}
          type="button"
          onClick={handleUpdateProfile}
        >
          Save
        </button>
      </form>
      {message && (
        <GlobalMessage
          type={messageType}
          onMessageClosed={() => setMessage("")}
        >
          {message}
        </GlobalMessage>
      )}
    </div>
  );
}
