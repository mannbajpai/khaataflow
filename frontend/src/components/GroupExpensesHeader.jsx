import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const GroupExpensesHeader = ({ groupId, toggleSidebar }) => (
  <div className="flex justify-between items-center mb-4">
    <button
      className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
      onClick={toggleSidebar}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
    <Link
      to={`/group/${groupId}/addExpense`}
      className="bg-turquoise-green btn rounded-full text-white hover:bg-green-300"
    >
      Add Group Expense
    </Link>
    <Link
      to={`/group/${groupId}/mySplits`}
      className="bg-blue-500 btn rounded-full text-white hover:bg-blue-300"
    >
      My Splits
    </Link>
  </div>
);

GroupExpensesHeader.propTypes = {
  groupId: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default GroupExpensesHeader;
