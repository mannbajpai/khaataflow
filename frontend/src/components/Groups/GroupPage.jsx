import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import GroupUsersList from "./GroupUsersDetails";
import GroupExpensesList from "./GroupExpensesList";
import {getGroup} from "../../services/groupService";

const GroupPage = ({ groupId }) => {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupData = await getGroup(groupId);
        setGroup(groupData);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchGroupData();
  }, [groupId]);

  if (!group) {
    setGroup({
        name:"Goa Trip",
        users: [{id:1, name:"Rohan", email:"rohan@test.com"},{id:2, name:"Rohit", email:"rohit@test.com"}],
        expenses: [{name:"Rohan to All",description:"Momos",amount:200,splitType:"equal"}],
    })
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">{group.name}</h1>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <GroupUsersList users={group.users} />
          </div>
          <div className="flex-1 mt-4 md:mt-0">
            <GroupExpensesList expenses={group.expenses} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

GroupPage.propTypes = {
    groupId: PropTypes.number.isRequired,
}

export default GroupPage;
