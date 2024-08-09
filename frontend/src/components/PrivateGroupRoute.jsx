import { Outlet, Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import  Loader  from "./Loader";
import { isMember } from "../services/groupService"; 

const PrivateGroupRoute = () => {
  const { user, loading:authLoading } = useAuth();
  const { groupId } = useParams();
  const [Member, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMembership = async () => {
      if (!user || authLoading) {
        setLoading(true);
        return;
      }

      try {
        const response = await isMember(groupId);
        if (response.data !== null) {
          setIsMember(true);
        } else {
          setIsMember(false);
        }
      } catch (error) {
        console.error("Error checking group membership:", error);
      } finally {
        setLoading(false);
      }
    };

    checkMembership();
  }, [groupId, authLoading, user]);

  if (authLoading || loading) {
    return <Loader />;
  }

  return Member ? <Outlet /> : <Navigate to={"/home"} />;
};

export default PrivateGroupRoute;
