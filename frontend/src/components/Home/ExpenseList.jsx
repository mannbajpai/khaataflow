import PropTypes from 'prop-types';
const ExpenseList = ({ expenses }) => {
  return (
    <div className="overflow-x-auto ">
      <table className="table w-full">
        <thead className='bg-secondary'>
          <tr className='text-xl'>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className='bg-primary text-lg'>
          {expenses.map((expense) => (
            <tr className='hover'key={expense.id}>
              <td>{expense.type}</td>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-accent mt-4 shadow-xl">Add Expense</button>
    </div>
  );
};
ExpenseList.propTypes = {
    expenses: PropTypes.array.isRequired,
}

export default ExpenseList;
