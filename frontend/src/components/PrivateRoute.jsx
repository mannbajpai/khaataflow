import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoaderImage } from "./Loader";
const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoaderImage />;
  }

  return (
        user ? <Outlet/> : <Navigate to="/login" />
  );
};

export default PrivateRoute;
