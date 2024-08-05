
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GroupExpensesList from "../components/GroupExpensesList";
import { getGroup } from "../services/groupService";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import GroupSidebar from "../components/GroupSidebar";
const GroupPage = () => {

  const { groupId } = useParams();

  const [group, setGroup] = useState({
    name: "",
    members: [],
    expenses: [],
  });
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleGoBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    const fetchGroupData = async (groupId) => {
      try {
        const groupData = await getGroup(groupId);
        setGroup(groupData.data.group);
        
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
      setLoading(false);
    };

    fetchGroupData(groupId);

  }, [groupId])

  const creator = group.members.find((member) => group.createdBy === member.id)
  const members = group.members.filter((member) => member.id != creator.id)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="pt-4 px-4 bg-base-100">
        <Navbar />
      </div>
      <div className="flex-1 container mx-auto p-4">

        {loading ? <Loader /> :
          <>
            <button className="ml-4" onClick={handleGoBack}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
            </button>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <GroupSidebar group={group} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} creator={creator} members={members} />
              <div className="flex-1 mt-4 md:mt-0">
                <GroupExpensesList groupId={groupId} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
              </div>
            </div>
          </>
        }
      </div>
      <Footer />
    </div>
  );
};


export default GroupPage;
