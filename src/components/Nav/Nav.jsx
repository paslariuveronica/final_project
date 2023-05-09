import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../features/Auth/AuthContext";
import styles from "./Nav.module.css";

export function Nav() {
  const { user, logout } = useAuthContext();
  return (
    <nav className={styles.nav}>
      <menu className={styles.menu}>
        <li className={styles["listelem"]}>
          <NavLink
            className={({ isActive }) => clsx({ [styles.active]: isActive })}
            to="/"
          >
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx({ [styles.active]: isActive })}
            to="/create"
          >
            Create new post
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx({ [styles.active]: isActive })}
            to="/photo"
          >
            Inspiration
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx({ [styles.active]: isActive })}
            to="/about"
          >
            About
          </NavLink>
        </li>

        {user && (
          <li>
            <a href="#" onClick={() => logout()}>
              Logout /
            </a>

            <NavLink
              className={({ isActive }) => clsx({ [styles.active]: isActive })}
              to="/user"
            >
              Personal information
            </NavLink>
          </li>
        )}
        {!user && (
          <>
            <li>
              <NavLink
                className={({ isActive }) =>
                  clsx({ [styles.active]: isActive })
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </>
        )}
      </menu>
    </nav>
  );
}
