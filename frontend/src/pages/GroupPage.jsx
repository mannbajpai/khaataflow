import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { getGroup } from "../services/groupService";
import GroupContext from "../context/GroupContext";
const GroupExpensesList = lazy(() => import("../components/GroupExpensesList"));
const GroupSidebar = lazy(() => import("../components/GroupSidebar"));

const GroupPage = () => {
  const { groupId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const [group, setGroup] = useState(() => {
    const cachedGroup = localStorage.getItem(`group-${groupId}`);
    return cachedGroup ? JSON.parse(cachedGroup) : { name: "", members: [], expenses: [] };
});
const [loading, setLoading] = useState(false);

useEffect(() => {
    const fetchGroupData = async (groupId) => {
        setLoading(true);
        try {
            const groupData = await getGroup(groupId);
            const fetchedGroup = groupData.data.group;

            if (!Array.isArray(fetchedGroup.members)) {
                fetchedGroup.members = [];
            }
            setGroup(fetchedGroup);
        } catch (error) {
            console.error("Error fetching group data:", error);
        }
        setLoading(false);
    };
    fetchGroupData(groupId);
}, [groupId]);

const creator = group.members.find((member) => group.createdBy === member.id);
const members = group.members.filter((member) => member.id !== creator?.id);

  return (
    <GroupContext.Provider value={{groupId, group, members, creator}} >
      <div className="min-h-screen flex flex-col">
        <div className="pt-4 px-4 bg-base-100">
          <Navbar />
        </div>
        <div className="flex-1 container mx-auto p-4">
          {loading?<Loader/>
          :<>
            <button className="ml-4" onClick={handleGoBack}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            </button>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <Suspense fallback={<Loader />}>
                <GroupSidebar
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </Suspense>
              <div className="flex-1 mt-4 md:mt-0">
                <Suspense fallback={<Loader />}>
                  <GroupExpensesList groupId={groupId} toggleSidebar={toggleSidebar} />
                </Suspense>
              </div>
            </div>
          </>}

        </div>
        <Footer />
      </div>
    </GroupContext.Provider>
  );
};

export default GroupPage;