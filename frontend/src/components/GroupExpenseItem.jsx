import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const GroupExpenseItem = ({ expense, groupId, user, deleteLoading, onDelete, isDeleting }) => (
  <li className="bg-gray-100 p-2 rounded md:flex sm:flex-row md:justify-between sm:justify-center items-center">
    <div className="text-left">
      <span className="font-semibold">{expense.description}</span>
      <p className="text-sm text-gray-500">{expense.date}</p>
    </div>
    <div className="text-right">
      <span className="block text-green-600">
        Rs. {expense.amount.toFixed(2)}
      </span>
      <span className="block text-sm text-gray-500">
        Split: {expense.type}
      </span>
    </div>
    <div className="mt-4">
      <h4 className="font-semibold">Expense Splits</h4>
      <ul className="mt-2 space-y-2">
        {expense.splits.map((split) => (
          <li key={split.id} className="bg-gray-200 p-2 rounded flex justify-between">
            <span className="text-gray-700">
              {split.lender.username} lent to {split.borrower.username}
            </span>
            <span className="font-bold text-gray-700">Rs. {split.amount}</span>
          </li>
        ))}
      </ul>
    </div>
    {expense.lenderId !== user.id ? (
      <div className="m-4">
        <Link to={`/group/${groupId}/expense/${expense.id}`} className="btn bg-blue-400 hover:bg-blue-200">
          View
        </Link>
      </div>
    ) : (
      <div className="m-4 flex flex-col">
        <Link to={`/group/${groupId}/expense/${expense.id}/edit`} className="btn bg-yellow-400 hover:bg-yellow-200 my-2">
          Edit
        </Link>
        {deleteLoading && isDeleting ? (
          <Loader />
        ) : (
          <button onClick={() => onDelete(expense.id)} className="btn bg-red-400 hover:bg-red-200 my-2">
            Delete
          </button>
        )}
      </div>
    )}
  </li>
);

GroupExpenseItem.propTypes = {
  expense: PropTypes.object.isRequired,
  groupId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  deleteLoading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool,
};

export default GroupExpenseItem;
