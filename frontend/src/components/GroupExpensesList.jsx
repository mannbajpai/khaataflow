import PropTypes from "prop-types"
import { useEffect, useState } from "react";
import { getGroupExpenses } from "../services/groupExpenseService";
import { useAuth } from "../context/AuthContext";
import { deleteGroupExpense } from "../services/groupExpenseService";
import Loader from "./Loader";
import { Link } from "react-router-dom";
const GroupExpensesList = ({ groupId, toggleSidebar }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [expensesPerPage] = useState(5); // Expenses per page
  const { user } = useAuth();

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await getGroupExpenses(groupId);
      if (res.status === "success") {
        setExpenses(res.data);
      }
      setLoading(false);
    }

    fetchExpenses();
  }, [groupId]);

  const handleDeleteExpense = async (expenseId) => {
    setDeleteLoading(true);
    try {
      const res = await deleteGroupExpense(groupId, expenseId);
      if (res.status === "success") {
        setExpenses(expenses.filter(expense => expense.id !== expenseId));
        alert("deleted successfully");
      } else {
        alert("failed to delete");
      }
    } catch (error) {
      throw new Error(error.message);
    }
    setDeleteLoading(false);
  }

  // Calculate pagination data
  const totalPages = Math.ceil(expenses.length / expensesPerPage);
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  return (
    <div className="flex-1 w-full p-4">
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
      <div className="bg-turquoise-green shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Group Expenses</h2>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ul className="space-y-2">
              {currentExpenses.map((expense) => (
                <li
                  key={expense.id}
                  className="bg-gray-100 p-2 rounded flex justify-between items-center"
                >
                  <div>
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

                  {/* Expense Split Details */}
                  <div className="mt-4">
                    <h4 className="font-semibold">Expense Splits</h4>
                    <ul className="mt-2 space-y-2">
                      {expense.splits.map((split) => (
                        <li
                          key={split.id}
                          className="bg-gray-200 p-2 rounded flex justify-between"
                        >
                          <span className="text-gray-700">
                            {split.lender.username} lent to {split.borrower.username}
                          </span>
                          <span className="font-bold text-gray-700">
                            Rs. {split.amount}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {expense.lenderId != user.id ? (
                    <div className="m-4">
                      <button className="btn bg-blue-400 hover:bg-blue-200">
                        View
                      </button>
                    </div>
                  ) : (
                    <div className="m-4 flex flex-col">
                      <button className="btn bg-yellow-400 hover:bg-yellow-200 my-2">
                        Edit
                      </button>
                      {deleteLoading ? (
                        <Loader />
                      ) : (
                        <button
                          key={expense.id}
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="btn bg-red-400 hover:bg-red-200  my-2"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`mx-1 px-3 py-1 border rounded ${currentPage === 1 ? "bg-gray-200" : "bg-white"
                  }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1
                      ? "bg-turquoise-green text-white"
                      : "bg-white"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={`mx-1 px-3 py-1 border rounded ${currentPage === totalPages ? "bg-gray-200" : "bg-white"
                  }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>

            {/* Show Range of Current Items */}
            <div className="text-center mt-2">
              Showing {indexOfFirstExpense + 1} to{" "}
              {Math.min(indexOfLastExpense, expenses.length)} of{" "}
              {expenses.length} expenses
            </div>
          </>
        )}
      </div>
    </div>
  );
};



GroupExpensesList.propTypes = {
  groupId: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired,
}

export default GroupExpensesList;
