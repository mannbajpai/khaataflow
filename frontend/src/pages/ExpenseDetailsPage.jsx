import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExpenseById, updateExpense, deleteExpense } from '../services/expenseService';
import { NotifyContainer, notifyError, notifySuccess } from '../components/Notification';

const ExpenseDetail = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    date: '',
    category: '',
    name: '',
    description: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const expenseData = await getExpenseById(id);
        setExpense(expenseData.data.expense);
        setFormData({
          type: expenseData.data.expense.type,
          name: expenseData.data.expense.name,
          amount: expenseData.data.expense.amount,
          date: expenseData.data.expense.date,
          category: expenseData.data.expense.category,
          description: expenseData.data.expense.description || '',
        });
      } catch (error) {
        console.error('Error fetching expense:', error);
        notifyError('Error fetching expense details.');
      }
    };

    fetchExpense();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    try {
      const res = await updateExpense(id, formData);
      setExpense(res.data.expense);
      setEditMode(false);
      notifySuccess('Expense updated successfully.');
    } catch (error) {
      console.error('Error updating expense:', error);
      notifyError('Failed to update expense.');
    }
  };

  const handleCancel = async () => {
    setEditMode(false);
  };

  const handleDeleteExpense = async () => {
    try {
      await deleteExpense(id);
      notifySuccess('Expense deleted successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error deleting expense:', error);
      notifyError('Failed to delete expense.');
    }
  };

  if (!expense) return <span className="loading loading-ring loading-lg"></span>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-turquoise-green">
      <div className="bg-white w-full max-w-3xl shadow-xl rounded-xl p-6 mx-8 my-4">

        <button className='btn glass' onClick={editMode ? (handleCancel) : (() => navigate(-1))}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </button>
        <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">Expense Details</h1>

        {editMode ? (
          <form onSubmit={handleUpdateExpense} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Type (Expense or Income) */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="input input-bordered w-full max-w-md"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="input input-bordered w-full max-w-md"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="input input-bordered w-full max-w-md"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="input input-bordered w-full max-w-md"
              >
                <option value="entertainment">Entertainment</option>
                <option value="travel">Travel</option>
                <option value="groceries">Groceries</option>
                <option value="investment">Investment</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full max-w-md"
              />
            </div>

            {/* Description (Optional) */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold text-gray-700">Description (Optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full max-w-md"
                rows="4"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-between md:col-span-2 mt-4">
              <button
                type="submit"
                className="btn w-24 text-green-700 bg-green-300 hover:bg-green-100 mr-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={()=>document.getElementById('my_modal_cancel').showModal()}
                className="btn w-24 text-red-700 bg-red-300 hover:bg-red-100"
              >
                Cancel
              </button>
              <dialog id="my_modal_cancel" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Warning</h3>
                  <p className="py-4">Are you sure want to discard the changes?</p>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className='btn w-24 text-blue-700 bg-blue-300 hover:bg-blue-100 mx-2'>Cancel</button>
                      <button onClick={handleCancel} className="btn w-24 text-red-700 bg-red-300 hover:bg-red-100 mx-2">Confirm</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </form>
        ) : (
          <div className="text-gray-600 text-center text-xl">
            <div className="mb-4">
              <strong>Name:</strong> {expense.name}
            </div>
            <div className="mb-4">
              <strong>Amount:</strong> Rs. {expense.amount}
            </div>
            <div className="mb-4">
              <strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}
            </div>
            <div className="mb-4">
              <strong>Category:</strong> {expense.category}
            </div>
            <div className="mb-4">
              <strong>Description:</strong> {expense.description || 'N/A'}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setEditMode(true)}
                className="btn w-24 text-green-700 bg-green-300 hover:bg-green-100"
              >
                Edit
              </button>
              <button
                onClick={()=>document.getElementById('my_modal_delete').showModal()}
                className="btn w-24 text-red-700 bg-red-300 hover:bg-red-100"
              >
                Delete
              </button>
              <dialog id="my_modal_delete" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <h3 className="font-bold text-xl text-red-500">Warning!</h3>
                  <p className="py-4">Are You Sure You Want To Delete The Expense?</p>
                  <div className="modal-action">
                    <form method="dialog">
                    <button className='btn w-24 text-blue-700 bg-blue-300 hover:bg-blue-100 mx-2'>Cancel</button>
                      <button onClick={handleDeleteExpense} className="btn w-24 text-red-700 bg-red-300 hover:bg-red-100 mx-2">Confirm</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        )}
      </div>
      <NotifyContainer />
    </div>
  );
};

export default ExpenseDetail;
