import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {LoaderContent} from "./Loader";
const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoaderContent />;
  }

  return (
        user ? <Outlet/> : <Navigate to="/login" />
  );
};

export default PrivateRoute;
