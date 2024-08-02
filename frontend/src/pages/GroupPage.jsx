
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GroupExpensesList from "../components/GroupExpensesList";
import { getGroup } from "../services/groupService";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import GroupSidebar from "../components/GroupSidebar";
const GroupPage = () => {

  const { groupId } = useParams();

  const [group, setGroup] = useState({
    name: "",
    members: [],
    expenses:[],
  });
  const [loading, setLoading] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchGroupData = async (groupId) => {
      try {
        const groupData = await getGroup(groupId);
        console.log(groupData.data.group);
        setGroup(groupData.data.group);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
      setLoading(false);
    };

    fetchGroupData(groupId);
  }, [groupId])


  return (
    <div className="min-h-screen flex flex-col">
      <div className="pt-4 px-4 bg-base-100">
        <Navbar />
      </div>
      <div className="flex-1 container mx-auto p-4">
        {loading ? <Loader /> :
          <div className="flex flex-col md:flex-row md:space-x-4">
            <GroupSidebar group={group} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
            <div className="flex-1 mt-4 md:mt-0">
              <GroupExpensesList groupId={groupId} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
            </div>
          </div>
        }
      </div>
      <Footer />
    </div>
  );
};


export default GroupPage;
