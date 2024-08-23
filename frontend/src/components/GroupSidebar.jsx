import { useContext, useState } from "react";
import PropTypes from "prop-types"
import { leaveGroup, removeMember } from "../services/groupService";
import { NotifyContainer, notifyError, notifySuccess } from "./Notification";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GroupContext from "../context/GroupContext";
function GroupSidebar({  isSidebarOpen, toggleSidebar }) {

  const { user } = useAuth();
  const {group, creator, members : Members} = useContext(GroupContext);
  const [members, setMembers] = useState(Members)
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLeaveGroup = async () => {
    try {
      const res = await leaveGroup(group.id);
      if (res.status === 'success') {
        notifySuccess("Left Group Successfully")
        setMembers((prevMembers)=> prevMembers.filter((member)=> member.id !== user.id))
        setTimeout(() => navigate('/home'), 3000)
      }
    } catch (error) {
      notifyError("Error while leaving group");
      throw new Error(error);
    }
  }

  const handleRemoveMember = async (memberId) => {
    try {
      const res = await removeMember(group.id, memberId);
      console.log("user removed response : ",res);
      if (res.status === 'success') {
        notifySuccess("Removed Member Successfully");
        setMembers((prevMembers)=> prevMembers.filter((member)=> member.id != memberId))
      }
    } catch (error) {
      notifyError("Error while removing member");
      throw new Error(error);
    }
  }

  return (
    <div
      className={`fixed md:static top-0 left-0 w-full md:w-1/3 h-full bg-white shadow-lg md:shadow-none transform md:transform-none transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-50 md:z-auto`}
    >
      <div className="p-4">
        {/* Group Name and Code */}
        <div className="flex justify-between">
          <div className="mb-4">
            <h1 className="text-xl font-bold">{group.name}</h1>
            <p className="text-gray-600">Group Code: {group.code}</p>
            <p className="text-gray-700 italic">{group.description}</p>
          </div>
          <button className="btn md:hidden" onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Group Creator */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Creator</h2>
          <div className="bg-gray-200 p-2 rounded flex items-center justify-between">
            <p className="text-gray-700">{creator.username}</p>
            {(creator.id === user.id) && <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </div>
              <ul tabIndex={0} className={`dropdown-content menu bg-white rounded-box z-[1] w-44 p-2 shadow text-red-500 ${isMenuVisible ? 'visible' : 'hidden'}`}>
                <li>
                  <button className="text-black">Settings
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </button>
                </li>
                <li>
                  <button onClick={handleLeaveGroup}>Leave Group
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                  </button>
                </li>
                <li>
                  <button onClick={handleLeaveGroup}>Delete Group
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>}
          </div>
        </div>
        {/* Group Members */}
        <div>
          <h2 className="text-lg font-semibold">Members</h2>
          <ul className="space-y-2">
            {members.map((member) => (
              <li
                key={member.id}
                className="bg-gray-200 p-2 rounded flex items-center justify-between"
              >
                <p className="text-gray-700">{member.username}</p>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="cursor-pointer" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                  </div>
                  <ul tabIndex={0} className={`dropdown-content menu bg-white rounded-box z-[1] w-44 p-2 shadow text-red-500 ${isMenuVisible ? 'visible' : 'hidden'}`}>
                    {(creator.id === user.id) ?
                      <li>
                        <button onClick={()=>handleRemoveMember(member.id)}>Remove Member
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                          </svg>
                        </button>
                      </li> :
                      <li>
                        <button onClick={handleLeaveGroup}>Leave Group
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                          </svg>
                        </button>
                      </li>
                    }
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <NotifyContainer />
    </div>
  );
}

GroupSidebar.propTypes = {
  group: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  creator: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
}

export default GroupSidebar;
