import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NotifyContainer, notifyError } from '../components/Notification';
import { getGroupExpense } from "../services/groupExpenseService"
import Loader from '../components/Loader';
const GroupExpenseDetail = () => {
    const { groupId, id } = useParams();
    const [groupExpense, setGroupExpense] = useState({
        type: '',
        description: '',
        amount: '',
        date: '',
        lender: {},
        splits: []
    });
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const expenseData = await getGroupExpense(groupId, id);
                setGroupExpense(expenseData.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching expense:', error);
                notifyError('Error fetching expense details.');
            }
        };

        fetchExpense();
    }, [groupId, id]);


    if (!groupExpense) return <Loader />;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-turquoise-green">
            <div className="bg-white w-full max-w-3xl shadow-xl rounded-xl p-6 mx-8 my-4">
                <button className='btn glass' onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>
                <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">Group Expense Details</h1>
                {loading ?
                    <div className='flex justify-center'>
                        <Loader />
                    </div>
                    :
                    <div className="text-gray-600 text-center text-xl">
                        <div className="mb-4">
                            <strong>Lender:</strong> {groupExpense.lender.username}
                        </div>
                        <div className="mb-4">
                            <strong>Amount:</strong> Rs. {groupExpense.amount}
                        </div>
                        <div className="mb-4">
                            <strong>Date:</strong> {new Date(groupExpense.date).toLocaleDateString()}
                        </div>
                        <div className="mb-4">
                            <strong>Description:</strong> {groupExpense.description}
                        </div>
                        <div className="mb-4">
                            <strong>Type:</strong> {groupExpense.type}
                        </div>
                        <div className="mt-4">
                        <div className='mb-4'>
                        <strong>Expense Splits</strong>
                        <ul className="mt-2 space-y-2 flex flex-col items-center">
                      {groupExpense.splits.map((split) => (
                        <li
                          key={split.id}
                          className="bg-green-200 py-2 px-8 w-full max-w-xl rounded-full flex justify-between"
                        >
                          <span className="text-gray-700">
                             {split.borrower.username}
                          </span>
                          <span className="font-bold text-green-700">
                            Rs. {split.amount}
                          </span>
                        </li>
                      ))}
                    </ul>
                        </div>
                    
                  </div>
                    </div>}
            </div>
            <NotifyContainer />
        </div>
    );
};

export default GroupExpenseDetail;
