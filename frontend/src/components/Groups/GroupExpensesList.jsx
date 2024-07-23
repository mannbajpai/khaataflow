import PropTypes from "prop-types"

const GroupExpensesList = ({ expenses }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Group Expenses</h2>
      <ul className="space-y-2">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="bg-gray-100 p-2 rounded flex justify-between items-center"
          >
            <div>
              <span className="font-semibold">{expense.name}</span>
              <p className="text-sm text-gray-500">{expense.description}</p>
            </div>
            <div className="text-right">
              <span className="block text-green-600">
                ${expense.amount.toFixed(2)}
              </span>
              <span className="block text-sm text-gray-500">
                Split: {expense.splitType}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

GroupExpensesList.propTypes = {
    expenses: PropTypes.array.isRequired,
}

export default GroupExpensesList;
