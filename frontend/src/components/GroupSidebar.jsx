import PropTypes from "prop-types"
function GroupSidebar({ group, isSidebarOpen, toggleSidebar }) {
  const creator = group.members.find((member) => group.createdBy === member.id);
  const members = group.members.filter((member) => member.id != creator.id);
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
          <div className="bg-gray-200 p-2 rounded">
            <p className="text-gray-700">{creator.username}</p>
          </div>
        </div>

        {/* Group Members */}
        <div>
          <h2 className="text-lg font-semibold">Members</h2>
          <ul className="space-y-2">
            {members.map((member) => (
              <li
                key={member.id}
                className="bg-gray-200 p-2 rounded flex items-center"
              >
                <p className="text-gray-700">{member.username}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

GroupSidebar.propTypes = {
  group: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.bool.isRequired,
}

export default GroupSidebar;
