import { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { getGroup } from "../services/groupService";
import { useNavigate, useParams } from "react-router-dom";

const GroupExpensesList = lazy(() => import("../components/GroupExpensesList"));
const GroupSidebar = lazy(() => import("../components/GroupSidebar"));

const GroupPage = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(() => {
    const cachedGroup = localStorage.getItem(`group-${groupId}`);
    return cachedGroup ? JSON.parse(cachedGroup) : { name: "", members: [], expenses: [] };
  });
  const [loading, setLoading] = useState(!localStorage.getItem(`group-${groupId}`));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchGroupData = async (groupId) => {
      try {
        const groupData = await getGroup(groupId);
        setGroup(groupData.data.group);
        localStorage.setItem(`group-${groupId}`, JSON.stringify(groupData.data.group));
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
      setLoading(false);
    };

    if (!localStorage.getItem(`group-${groupId}`)) {
      fetchGroupData(groupId);
    }
  }, [groupId]);

  const creator = group.members.find((member) => group.createdBy === member.id);
  const members = group.members.filter((member) => member.id !== creator?.id);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="pt-4 px-4 bg-base-100">
        <Navbar />
      </div>
      <div className="flex-1 container mx-auto p-4">
        {loading ? (
          <Loader />
        ) : (
          <>
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
                  group={group}
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                  creator={creator}
                  members={members}
                />
              </Suspense>
              <div className="flex-1 mt-4 md:mt-0">
                <Suspense fallback={<Loader />}>
                  <GroupExpensesList groupId={groupId} toggleSidebar={toggleSidebar} />
                </Suspense>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GroupPage;
