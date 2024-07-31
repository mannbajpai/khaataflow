import PropTypes from "prop-types"

const GroupUsersList = ( users ) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Group Members</h2>
        <ul className="space-y-2">
          {users.users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              <span>{user.username}</span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

GroupUsersList.propTypes = {
  users: PropTypes.array.isRequired,
}

export default GroupUsersList;