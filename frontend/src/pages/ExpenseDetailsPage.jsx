import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExpenseById, updateExpense, deleteExpense } from '../services/expenseService';

const ExpenseDetail = () => {

  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    type:'',
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
          type: expenseData.type,
          name: expenseData.name,
          amount: expenseData.amount,
          date: expenseData.date ,
          category: expenseData.category,
          description: expenseData.description || '',
        });
      } catch (error) {
        console.error('Error fetching expense:', error);
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
    } catch (error) {
      console.error('Error updating expense:', error);
      alert('Failed to update expense.');
    }
  };

  const handleCancel = async () => {
    setEditMode(false);
  }

  const handleDeleteExpense = async () => {
    try {
      await deleteExpense(id);
      alert('Expense deleted successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense.');
    }
  };

  if (!expense) return <span className="loading loading-ring loading-lg"></span>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Expense Details</h1>
      {editMode ? (
        <form onSubmit={handleUpdateExpense} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Type (Expense or Income) */}
          <div className=''>
            <label className="block mb-2 font-semibold">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="input input-bordered w-full max-w-sm"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-2 font-semibold">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="input input-bordered w-full max-w-sm"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="input input-bordered w-full max-w-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="input input-bordered w-full max-w-sm"
            >
              <option value="entertainment">Entertainment</option>
              <option value="travel">Travel</option>
              <option value="groceries">Groceries</option>
              <option value="investment">Investment</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input input-bordered w-full max-w-sm"
            />
          </div>

          {/* Description (Optional) */}
          <div>
            <label className="block mb-2 font-semibold">Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full textarea textarea-bordered"
              rows="3"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="btn bg-turquoise-green hover:bg-green-200"
            >
              Submit
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
      ) : (
        <div>
          <div className="mb-4">
            <strong>Name:</strong> {expense.name}
          </div>
          <div className="mb-4">
            <strong>Amount:</strong> {expense.amount}
          </div>
          <div className="mb-4">
            <strong>Date:</strong> {expense.date}
          </div>
          <div className="mb-4">
            <strong>Category:</strong> {expense.category}
          </div>
          <div className="mb-4">
            <strong>Description:</strong> {expense.description || 'N/A'}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setEditMode(true)}
              className="btn btn-primary mr-2"
              style={{ backgroundColor: '#4ECCA3' }}
            >
              Edit
            </button>
            <button
              onClick={handleDeleteExpense}
              className="btn btn-danger"
              style={{ backgroundColor: '#E74C3C' }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseDetail;
