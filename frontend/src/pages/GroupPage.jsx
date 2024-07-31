
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GroupUsersList from "../components/GroupUsersDetails";
import GroupExpensesList from "../components/GroupExpensesList";
import { getGroup } from "../services/groupService";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

const GroupPage = () => {

  const { groupId } = useParams();

  const [group, setGroup] = useState({
    name: "",
    members: [],
    expenses:[],
  });
  const [loading, setLoading] = useState(true);

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
        <h1 className="text-2xl font-bold text-center mb-6">{group.name}</h1>
        {loading ? <Loader /> :
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <GroupUsersList users={group.members} />
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <GroupExpensesList expenses={group.expenses} />
            </div>
          </div>
        }
      </div>
      <Footer />
    </div>
  );
};


export default GroupPage;
