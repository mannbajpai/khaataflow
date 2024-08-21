import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createGroupExpense } from '../services/groupExpenseService';
import { useAuth } from '../context/AuthContext';
import BorrowerSelect from '../components/BorrowerSelect';
import { NotifyContainer, notifyError, notifySuccess, notifyWarning } from '../components/Notification';
import Loader from '../components/Loader';
const AddGroupExpense = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { groupId } = useParams()
    const [formData, setFormData] = useState({
        groupId: Number(groupId),
        lenderId: user.id,
        type: 'equal',
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
        if (!formData.amount || !formData.date || !formData.type || !formData.description) {
            notifyWarning('Please fill in all required fields');
            return;
        }
        try {
            setLoading(true);
            const response = await createGroupExpense(groupId, formData);
            if (response) {
                notifySuccess('Expense Added Successfully');
                setTimeout(() => {
                    setLoading(false);
                    navigate(`/group/${groupId}`);
                }, 3000);
            }
        } catch (error) {
            notifyError('Error adding expense:', error.message);
            setLoading(false);
        }
    };

    // Handle cancel action
    const handleCancel = () => {
        navigate(-1);
    };

    formData.borrowers = selectedBorrowers;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-turquoise-green">
            <div className="w-full max-w-3xl p-8 space-y-4 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center">Add Expense</h1>
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
                            className={`btn bg-turquoise-green hover:bg-green-200 ${loading && "btn-disabled"}`}
                        >
                            {loading?<Loader/>:"Submit"}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn btn-error"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div >
            <NotifyContainer />
        </div >
    );
};

export default AddGroupExpense;
