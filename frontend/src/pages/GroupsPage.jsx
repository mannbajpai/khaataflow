import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GroupCard from "../components/GroupCard";
import { getAllGroups } from "../services/groupService";
import Loader, {LoaderImage} from "../components/Loader"
import { Link } from "react-router-dom";

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getAllGroups();
        setGroups(response.data.groups);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="pt-4 px-4 bg-base-100">
        <Navbar />
      </div>
      <div className="flex-1 p-8">
      <div className="flex flex-row justify-between">
      <Link to='/joinGroup' className="btn btn-lg bg-turquoise-green text-white hover:text-green-700 hover:bg-green-300 focus:border-green-700">Join Group</Link>
      <Link to='/createGroup' className="btn btn-lg text-white hover:text-blue-700 bg-blue-400 hover:bg-blue-200 focus:border-blue-700">Create Group</Link>
      </div>
        <h1 className="text-3xl font-bold mb-6 text-center">Your Groups</h1>
        {loading?<Loader/>:<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            loading?
            <LoaderImage key={group.id}/>
            :<GroupCard key={group.id} group={group} />
          ))}
        </div>}
      </div>
      <Footer />
    </div>
  );
};

export default GroupsPage;
