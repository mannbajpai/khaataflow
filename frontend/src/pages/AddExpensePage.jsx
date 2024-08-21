import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExpense } from "../services/expenseService"
import { NotifyContainer, notifyError, notifySuccess, notifyWarning } from '../components/Notification';
import Loader from "../components/Loader"
const AddExpense = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    date: '',
    category: 'entertainment',
    name: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

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
    if (!formData.amount || !formData.date || !formData.category || !formData.name) {
      notifyWarning('Please fill in all required fields');
      return;
    }
    try {
      setLoading(true);
      const response = await createExpense(formData);
      if (response.status === 'success') {
        notifySuccess('Expense Added Successfully');
        setTimeout(() => {
          setLoading(false);
          navigate('/home');
        }, 3000);
      }
    } catch (error) {
      notifyError('Error adding expense:', error);
      setLoading(false);
    }

  };

  // Handle cancel action
  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-turquoise-green">
      <div className="w-full max-w-3xl p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Add Expense</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Type (Expense or Income) */}
          <div className=''>
            <label className="block mb-2 font-semibold">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
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

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input input-bordered w-full max-w-sm"
              defaultValue="entertainment"
            >
              <option value="entertainment">Entertainment</option>
              <option value="travel">Travel</option>
              <option value="groceries">Groceries</option>
              <option value="investment">Investment</option>
              <option value="salary">Salary</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full max-w-sm"
              required
            />
          </div>

          {/* Description (Optional) */}
          <div>
            <label className="block mb-2 font-semibold">Description (Optional)</label>
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
              {loading ? <Loader /> : "Submit"}
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
      </div>
      <NotifyContainer />
    </div>
  );
};

export default AddExpense;
