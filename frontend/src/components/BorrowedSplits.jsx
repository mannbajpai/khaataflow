
import PropTypes from "prop-types"

const BorrowedSplits = ({ splits }) => {
  return (
    <div className="mb-4 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-turquoise-green">Borrowed Splits</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-turquoise-green text-white">
            <tr>
              <th className="py-2 px-4 border-b-2">Lender</th>
              <th className="py-2 px-4 border-b-2">Amount</th>
              <th className="py-2 px-4 border-b-2">Settled</th>
              <th className="py-2 px-4 border-b-2">Settle</th>
            </tr>
          </thead>
          <tbody>
            {splits.map((expense) => (
              expense.splits.map((split, splitIndex) => (
                <tr key={splitIndex} className="hover:bg-gray-100 transition duration-300 text-center">
                  <td className="py-2 px-4 border-b">
                    <span className="font-medium text-gray-700">{split.lender.username}</span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span className="text-gray-700 font-semibold">Rs. {split.amount.toFixed(2)}</span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span className={`py-1 px-2 rounded-full text-xs font-semibold ${split.settled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {split.settled ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button className='btn btn-sm text-blue-700 bg-blue-200 hover:bg-blue-100'>Settle</button>
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

BorrowedSplits.propTypes = {
  splits: PropTypes.arrayOf(
    PropTypes.shape({
      splits: PropTypes.arrayOf(
        PropTypes.shape({
          lenderId: PropTypes.string.isRequired,
          amount: PropTypes.number.isRequired,
          settled: PropTypes.bool.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default BorrowedSplits;
