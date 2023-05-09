import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "./Auth.context";

export function AuthRequiredRoute() {
  const { user } = useAuthContext();
  const { pathname } = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  return <Outlet />;
}
