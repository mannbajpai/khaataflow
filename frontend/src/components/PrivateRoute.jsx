import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <span className="loading loading-ring loading-lg"></span>
  }

  return (
        user ? <Outlet/> : <Navigate to="/login" />
  );
};

export default PrivateRoute;
