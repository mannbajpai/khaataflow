import  { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GroupCard from "../components/GroupCard";
import { getAllGroups } from "../services/groupService";

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getAllGroups();
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Groups</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GroupsPage;
