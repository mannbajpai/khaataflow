import PropTypes from "prop-types";
import { useEffect, useState, useMemo, useCallback } from "react";
import { getGroupExpenses, deleteGroupExpense } from "../services/groupExpenseService";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";
import * as Notification from "./Notification";
import Pagination from "./Pagination";
import GroupExpenseItem from "./GroupExpenseItem";
import GroupExpensesHeader from "./GroupExpensesHeader";

const GroupExpensesList = ({ groupId, toggleSidebar }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 5;
  const { user } = useAuth();

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await getGroupExpenses(groupId);
      if (res.status === "success") {
        setExpenses(res.data);
      }
      setLoading(false);
    };
    fetchExpenses();
  }, [groupId]);

  const handleDeleteExpense = useCallback(async (expenseId) => {
    setIsDeleting((prev) => ({ ...prev, [expenseId]: true }));
    setDeleteLoading(true);
    try {
      const res = await deleteGroupExpense(groupId, expenseId);
      if (res.status === "success") {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== expenseId)
        );
        Notification.notifySuccess("Deleted successfully");
      } else {
        Notification.notifyError("Failed to delete");
      }
    } catch (error) {
      Notification.notifyError(error.message);
    } finally {
      setDeleteLoading(false);
    }
  }, [groupId]);

  const totalPages = useMemo(() => Math.ceil(expenses.length / expensesPerPage), [expenses]);
  const currentExpenses = useMemo(() => {
    const indexOfLastExpense = currentPage * expensesPerPage;
    const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
    return expenses.slice(indexOfFirstExpense, indexOfLastExpense);
  }, [currentPage, expenses, expensesPerPage]);

  return (
    <div className="flex-1 w-full p-4">
      <GroupExpensesHeader groupId={groupId} toggleSidebar={toggleSidebar} />
      <div className="bg-turquoise-green shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Group Expenses</h2>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ul className="space-y-2">
              {currentExpenses.map((expense) => (
                <GroupExpenseItem
                  key={expense.id}
                  expense={expense}
                  groupId={groupId}
                  user={user}
                  deleteLoading={deleteLoading}
                  onDelete={handleDeleteExpense}
                  isDeleting={isDeleting[expense.id]}
                />
              ))}
            </ul>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={expenses.length}
              itemsPerPage={expensesPerPage}
            />
          </>
        )}
      </div>
      <Notification.NotifyContainer />
    </div>
  );
};

GroupExpensesList.propTypes = {
  groupId: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default GroupExpensesList;
