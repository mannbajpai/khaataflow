import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import ChartsSection from "../components/Chart"
import ExpenseList from "../components/ExpenseList"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import { getAllExpenses } from '../services/expenseService';

const Home = () => {
  const [balanceData, setBalanceData] = useState({ income: 0, expenses: 0 });
  const [expenseData, setExpenseData] = useState({ categories: [], amounts: [] });
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const balance = { income: 0, expenses: 0 };
    const categories = { 'Entertainment': 0, 'Travel': 0, 'Investment': 0, 'Groceries': 0};
    // Fetching data from the server
    const fetchExpenses = async () => {
      try {
        const expensesData = await getAllExpenses();
        if (expensesData.data.expenses.length > 0) {
          setExpenses(expensesData.data.expenses);
          expenses.map((expense) => {
            if (expense.type === 'expense') {
              balance.expenses += expense.amount;
            } else {
              balance.income += expense.amount;
            }
            switch (expense.category) {
              case "entertainment":
                categories.Entertainment += expense.amount;
                break;
              case "travel":
                categories.Travel += expense.amount;
                break;
              case "investment":
                categories.Investment += expense.amount;
                break;
              case "groceries":
                categories.Groceries += expense.amount;
                break;
              default:
                break;
            }
          })
          setBalanceData(balance);
          setExpenseData({
            categories: Object.keys(categories),
            amounts: Object.values(categories)
          });
        } else {
          setBalanceData({ income: 2000, expenses: 1500 });
          setExpenseData({
            categories: ['Entertainment', 'Travel', 'Investment', 'Groceries'],
            amounts: [500, 300, 200, 500]
          });
          setExpenses([
            { id: 1, type: 'Income', description: 'Salary', amount: 2000, date: '2024-07-01' },
            { id: 2, type: 'Expense', description: 'Groceries', amount: 100, date: '2024-07-02' },
            { id: 1, type: 'Expense', description: 'Travel', amount: 400, date: '2024-07-03' },
            { id: 2, type: 'Expense', description: 'Entertainment', amount: 300, date: '2024-07-02' },
          ]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();

  }, [expenses]);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="pt-4 px-4 bg-base-100">
        <Navbar />
      </div>
      <main className="flex flex-grow md:flex-row p-4 bg-base-100 text-base-content space-x-4">
        <div className="w-1/3 p-4">
          {loading ? <Loader /> : <ChartsSection balanceData={balanceData} expenseData={expenseData} />}
        </div>
        <div className="w-2/3 p-4 text-secondary-content">
          {loading ? <Loader /> : <ExpenseList expenses={expenses} />}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home