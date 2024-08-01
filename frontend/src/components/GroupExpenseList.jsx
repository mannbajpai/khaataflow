import PropTypes from "prop-types"
function GroupExpenseList({ groupExpenses, toggleSidebar }) {
    return (
        <div className="flex-1 md:w-2/3 p-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
                    onClick={toggleSidebar}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                </button>

                {/* Add Group Expense Button */}
                <button className="bg-turquoise-green text-white py-2 px-4 rounded hover:bg-turquoise-green-dark">
                    Add Group Expense
                </button>
            </div>

            {/* Group Expenses */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Group Expenses</h2>
                <ul className="space-y-4">
                    {groupExpenses.map((expense) => (
                        <li key={expense.id} className="bg-white p-4 rounded shadow-md">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-md font-semibold">{expense.description}</h3>
                                    <p className="text-gray-600">{expense.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-700 font-bold">${expense.amount}</p>
                                    <p className="text-gray-500">{expense.type}</p>
                                </div>
                            </div>

                            {/* Expense Split Details */}
                            <div className="mt-4">
                                <h4 className="font-semibold">Expense Splits</h4>
                                <ul className="mt-2 space-y-2">
                                    {expense.splits.map((split) => (
                                        <li
                                            key={split.id}
                                            className="bg-gray-200 p-2 rounded flex justify-between"
                                        >
                                            <span className="text-gray-700">
                                                {split.lender.username} lent to {split.borrower.username}
                                            </span>
                                            <span className="font-bold text-gray-700">${split.amount}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

GroupExpenseList.propTypes = {
    groupExpenses: PropTypes.array,
    toggleSidebar: PropTypes.bool,
}

export default GroupExpenseList;