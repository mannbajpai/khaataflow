import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getAllExpenses } from '../services/expenseService';

const ExpenseList = ({expensesTestData}) => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expensesData = await getAllExpenses();
        if (expensesData.data.expenses.length > 0){
          setExpenses(expensesData.data.expenses);
        } else {
          setExpenses(expensesTestData);
        }

      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [expensesTestData]);

  const handleViewExpense = (expenseId) => {
    navigate(`/expense/${expenseId}`);
  };

  return (
    <div className="overflow-x-auto ">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Type</th>
            <th className="py-2 px-4 border-b border-gray-200">Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Amount</th>
            <th className="py-2 px-4 border-b border-gray-200">Date</th>
            <th className="py-2 px-4 border-b border-gray-200">Category</th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-100 text-center">
              <td className="py-2 px-4 border-b border-gray-200">{expense.type}</td>
              <td className="py-2 px-4 border-b border-gray-200">{expense.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{expense.amount}</td>
              <td className="py-2 px-4 border-b border-gray-200">{expense.date}</td>
              <td className="py-2 px-4 border-b border-gray-200">{expense.category}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button
                  onClick={() => handleViewExpense(expense.id)}
                  className="btn btn-sm btn-primary mr-2"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/addExpense' className="btn btn-accent mt-4 shadow-xl">
        Add Expense
      </Link>
    </div>
  );
};

ExpenseList.propTypes = {
  expensesTestData: PropTypes.array.isRequired,
}

export default ExpenseList;
