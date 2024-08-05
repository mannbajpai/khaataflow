
import React from 'react';
import PropTypes from "prop-types"

const LendedSplits = ({ splits }) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Lended Splits</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Borrower ID</th>
              <th>Amount</th>
              <th>Settled</th>
            </tr>
          </thead>
          <tbody>
            {splits.map((expense, index) => (
              <tr key={index}>
                {expense.splits.map((split, index) => (
                  <React.Fragment key={index}>
                    <td>{split.borrowerId}</td>
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

LendedSplits.propTypes = {
    splits: PropTypes.array.isRequired,
}

export default LendedSplits;