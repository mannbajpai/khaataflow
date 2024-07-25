import { useState,useEffect } from "react"
import Navbar from "../Navbar"
import ChartsSection from "./Chart"
import ExpenseList from "./ExpenseList"
import Footer from "../Footer"

const Home = () => {
  const [balanceData, setBalanceData] = useState({ income: 0, expenses: 0 });
  const [expenseData, setExpenseData] = useState({ categories: [], amounts: [] });
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    // This is just a placeholder example
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
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="pt-4 px-4 bg-base-100">
      <Navbar />
      </div>
      <main className="flex flex-grow md:flex-row p-4 bg-base-100 text-base-content space-x-4">
        <div className="w-1/2 p-4">
          <ChartsSection balanceData={balanceData} expenseData={expenseData} />
        </div>
        <div className="w-1/2 p-4 text-secondary-content">
          <ExpenseList expenses={expenses} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home