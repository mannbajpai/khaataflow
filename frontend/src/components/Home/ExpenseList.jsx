import PropTypes from 'prop-types';
const ExpenseList = ({ expenses }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.type}</td>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary mt-4">Add Expense</button>
    </div>
  );
};
ExpenseList.propTypes = {
    expenses: PropTypes.array.isRequired,
}

export default ExpenseList;
