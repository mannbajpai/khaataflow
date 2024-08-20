import { useEffect, useState, useMemo, Suspense, lazy } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { getAllGroups } from "../services/groupService";
import GroupContext from "../context/GroupContext";

// Lazy load the GroupCard and GroupActions components
const GroupCard = lazy(() => import("../components/GroupCard"));
const GroupActions = lazy(() => import("../components/GroupActions"));

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getAllGroups();
        setGroups(response.data.groups);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const totalPages = useMemo(() => Math.ceil(groups.length / itemsPerPage), [groups.length]);
  const currentGroups = useMemo(
    () => groups.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [groups, currentPage, itemsPerPage]
  );

  const memoizedGroups = useMemo(() => currentGroups, [currentGroups]);

  return (
    <GroupContext.Provider value={{ memoizedGroups }}>
      <div className="min-h-screen flex flex-col">
        <div className="pt-4 px-4 bg-base-100">
          <Navbar />
        </div>
        <div className="flex-1 p-8">
          <Suspense fallback={<Loader />}>
            <GroupActions />
          </Suspense>
          <h1 className="text-3xl font-bold mb-6 text-center">Your Groups</h1>
          {loading ? (
            <Loader />
          ) : (
            <>
              <Suspense fallback={<Loader />}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {memoizedGroups.map((group) => (
                    <GroupCard key={group.id} group={group} />
                  ))}
                </div>
              </Suspense>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={groups.length}
                itemsPerPage={itemsPerPage}
              />
            </>
          )}
        </div>
        <Footer />
      </div>
    </GroupContext.Provider>
  );
};

export default GroupsPage;
