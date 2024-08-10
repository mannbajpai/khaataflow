import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateGroupExpense, getGroupExpense } from '../services/groupExpenseService';
import BorrowerSelect from '../components/BorrowerSelect';
import { NotifyContainer, notifyError, notifySuccess, notifyWarning } from '../components/Notification';
import Loader from "../components/Loader"
import { useAuth } from '../context/AuthContext';
const EditGroupExpense = () => {
    const {user} = useAuth()
    const navigate = useNavigate();
    const { groupId, id } = useParams()
    const [formData, setFormData] = useState({
        type: '',
        amount: '',
        date: '',
        description: '',
        borrowers: [],
    });

    const [selectedBorrowers, setSelectedBorrowers] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleSelectedBorrowersChange = (borrowers) => {
        setSelectedBorrowers(borrowers);
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform validation (optional)
        if (!formData.amount || !formData.date || !formData.type || !formData.borrowers) {
            notifyWarning('Please fill in all required fields');
            return;
        }
        try {
            const response = await updateGroupExpense(groupId, id, formData);
            if (response) {
                notifySuccess('Expense Updated Successfully');
                setTimeout(() => {
                    navigate(`/group/${groupId}`);
                }, 3000);
            }
        } catch (error) {
            console.error(error.message);
            notifyError('Error Updating expense:', error.message);
        }
    };


    // Handle cancel action
    const handleCancel = () => {
        navigate(-1);
    };

    formData.borrowers = selectedBorrowers;

    useEffect(() => {
        const fetchGroupExpense = async () => {
            setLoading(true);
            const res = await getGroupExpense(groupId, id);
            const data = res.data;
            if (data.lender.id === user.id){
                setFormData({
                    type: data.type,
                    amount: data.amount,
                    date: data.date,
                    description: data.description,
                });
            } else {
                navigate("/home");
            }
            setLoading(false);
        };

        fetchGroupExpense();
    }, [groupId, id, user.id, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-turquoise-green">
            <div className="w-full max-w-3xl p-8 space-y-4 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center">Update Expense</h1>
                {loading ?
                    <Loader />
                    :
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className=''>
                            <label className="block mb-2 font-semibold">Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                className="input input-bordered w-full max-w-sm"
                            >
                                <option value="equal">Equally</option>
                                <option value="exact">Exact</option>
                                <option value="percentage">Percentage</option>
                            </select>
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="block mb-2 font-semibold">Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="input input-bordered w-full max-w-sm"
                                required
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block mb-2 font-semibold">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="input input-bordered w-full max-w-sm"
                                required
                            />
                        </div>

                        {/* Borrower */}
                        <BorrowerSelect groupId={groupId} onSelectedBorrowersChange={handleSelectedBorrowersChange} expenseType={formData.type} />
                        {/* Description (Optional) */}
                        <div>
                            <label className="block mb-2 font-semibold">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full textarea textarea-bordered"
                                rows="3"
                            ></textarea>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="btn text-green-800 bg-turquoise-green hover:bg-green-200"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="btn text-red-700 bg-red-300 hover:bg-red-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                }
            </div >
            <NotifyContainer />
        </div >
    );
};

export default EditGroupExpense;
