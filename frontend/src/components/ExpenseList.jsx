import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ExpenseList = ({ expenses }) => {
  const memoizedExpenses = useMemo(() => expenses, [expenses]);
  const navigate = useNavigate();
  const handleViewExpense = (expenseId) => {
    navigate(`/expense/${expenseId}`);
  };

  return (
    <>
      <div className='overflow-x-auto rounded-2xl'>
        <table className="lg:w-[60vw] w-full mr-2 bg-gray-200 border-gray-100 rounded-xl">
          <thead className="text-black">
            <tr className=''>
              <th className="py-2 px-4 border-b border-gray-200 rounded-xl">Type</th>
              <th className="py-2 px-4 border-b border-gray-200 rounded-xl">Name</th>
              <th className="py-2 px-4 border-b border-gray-200 rounded-xl">Amount</th>
              <th className="py-2 px-4 border-b border-gray-200 rounded-xl">Date</th>
              <th className="py-2 px-4 border-b border-gray-200 rounded-xl">Category</th>
              <th className="py-2 px-4 border-b border-gray-200 rounded-xl">Actions</th>
            </tr>
          </thead>
          <tbody className='cursor-pointer'>
            {memoizedExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-100 text-center rounded-2xl">
                <td className="py-2 px-4 border-b border-gray-200">{expense.type}</td>
                <td className="py-2 px-4 border-b border-gray-200">{expense.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{expense.amount}</td>
                <td className="py-2 px-4 border-b border-gray-200">{expense.date}</td>
                <td className="py-2 px-4 border-b border-gray-200">{expense.category}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => handleViewExpense(expense.id)}
                    className="btn btn-sm  btn-primary mr-2"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to='/addExpense' className="btn sm:btn-lg hover:btn-xl btn-accent mt-4 shadow-xl">
        Add Expense
      </Link>
    </>
  );
};

ExpenseList.propTypes = {
  expenses: PropTypes.array.isRequired,
}

export default ExpenseList;
