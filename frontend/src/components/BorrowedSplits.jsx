
import React from 'react';
import PropTypes from "prop-types"
const BorrowedSplits = ({ splits }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold mb-2">Borrowed Splits</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Lender ID</th>
              <th>Amount</th>
              <th>Settled</th>
            </tr>
          </thead>
          <tbody>
            {splits.map((expense, index) => (
              <tr key={index}>
                {expense.splits.map((split, index) => (
                  <React.Fragment key={index}>
                    <td>{split.lenderId}</td>
                    <td>Rs. {split.amount}</td>
                    <td>{split.settled ? 'Yes' : 'No'}</td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

BorrowedSplits.propTypes = {
    splits: PropTypes.array.isRequired,
}

export default BorrowedSplits;