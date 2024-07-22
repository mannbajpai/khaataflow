import { useState,useEffect } from "react"
import Navbar from "./Navbar"
import ChartComponent from "./Chart"
import ExpenseList from "./ExpenseList"
import Footer from "./Footer"
const Home = () => {
  const [data, setData] = useState({ income: 0, expenses: 0 });
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    // This is just a placeholder example
    setData({ income: 2000, expenses: 1500 });
    setExpenses([
      { id: 1, type: 'Income', description: 'Salary', amount: 2000, date: '2024-07-01' },
      { id: 2, type: 'Expense', description: 'Groceries', amount: 100, date: '2024-07-02' },
    ]);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-grow p-4">
        <div className="w-1/2 p-4">
          <ChartComponent data={data} />
        </div>
        <div className="w-1/2 p-4">
          <ExpenseList expenses={expenses} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home