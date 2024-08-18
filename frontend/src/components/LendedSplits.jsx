import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import { settleExpense, deleteExpense } from '../services/groupExpenseService';
import { notifySuccess, notifyError, NotifyContainer } from "../components/Notification";

const LendedSplits = ({ splits }) => {
    const [expenseSplits, setExpenseSplits] = useState(splits);

    const settleSplit = async (splitId) => {
        try {
            const res = await settleExpense(splitId);
            if (res.status === 'success') {
                setExpenseSplits(prevSplits =>
                    prevSplits.map(expense => ({
                        ...expense,
                        splits: expense.splits.map(split =>
                            split.id === splitId ? { ...split, settled: true } : split
                        )
                    }))
                );
                notifySuccess(res.message);
            } else {
                notifyError(res.message);
            }
        } catch (error) {
            notifyError("Error Settling Split");
            throw new Error("failure", error.message);
        }
    };

    const deleteSplit = async (splitId) => {
        try {
            const res = await deleteExpense(splitId);
            if (res.status === 'success') {
                setExpenseSplits(prevSplits =>
                    prevSplits.map(expense => ({
                        ...expense,
                        splits: expense.splits.filter(split => split.id !== splitId)
                    }))
                );
                notifySuccess(res.message || 'Split deleted successfully!');
            } else {
                notifyError("Failed to delete the split.");
            }
        } catch (error) {
            notifyError("Error Deleting Split");
            throw new Error(error.message);
        }
    };

    const memoizedExpenseSplits = useMemo(() => {
        return expenseSplits;
    }, [expenseSplits]);

    return (
        <div className="mb-4 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-turquoise-green">Lended Splits</h3>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead className="bg-turquoise-green text-white">
                        <tr>
                            <th className="py-2 px-4 border-b-2">Borrower</th>
                            <th className="py-2 px-4 border-b-2">Amount</th>
                            <th className="py-2 px-4 border-b-2">Settled</th>
                            <th className="py-2 px-4 border-b-2">Settle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memoizedExpenseSplits.map((expense) => (
                            expense.splits.map((split, splitIndex) => (
                                <tr key={splitIndex} className="hover:bg-gray-100 transition duration-300 text-center">
                                    <td className="py-2 px-4 border-b">
                                        <span className="font-medium text-gray-700">{split.borrower.username}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <span className="text-gray-700 font-semibold">Rs. {split.amount.toFixed(2)}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <span className={`py-1 px-2 rounded-full text-xs font-semibold ${split.settled ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                            {split.settled ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    {split.settled ?
                                        <td className="py-2 px-4 border-b">
                                            <button onClick={() => deleteSplit(split.id)} className='btn btn-sm text-red-700 bg-red-200 hover:bg-red-100'>Delete</button>
                                        </td>
                                        :
                                        <td className="py-2 px-4 border-b">
                                            <button onClick={() => settleSplit(split.id)} className='btn btn-sm text-blue-700 bg-blue-200 hover:bg-blue-100'>Settle</button>
                                        </td>
                                    }
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
            <NotifyContainer />
        </div>
    );
};

LendedSplits.propTypes = {
    splits: PropTypes.arrayOf(
        PropTypes.shape({
            splits: PropTypes.arrayOf(
                PropTypes.shape({
                    borrowerId: PropTypes.string.isRequired,
                    amount: PropTypes.number.isRequired,
                    settled: PropTypes.bool.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
};

export default LendedSplits;
