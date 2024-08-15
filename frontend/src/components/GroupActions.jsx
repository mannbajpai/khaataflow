import { Link } from "react-router-dom";

const GroupActions = () => (
  <div className="flex flex-row justify-between mb-6">
    <Link
      to="/joinGroup"
      className="btn btn-lg bg-turquoise-green text-white hover:text-green-700 hover:bg-green-300 focus:border-green-700"
    >
      Join Group
    </Link>
    <Link
      to="/createGroup"
      className="btn btn-lg text-white hover:text-blue-700 bg-blue-400 hover:bg-blue-200 focus:border-blue-700"
    >
      Create Group
    </Link>
  </div>
);

export default GroupActions;
