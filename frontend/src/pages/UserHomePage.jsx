import { useState, useEffect, useMemo, Suspense, lazy } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { getAllExpenses } from "../services/expenseService";
import BalanceContext from "../context/BalanceContext";

// Lazy load the ChartsSection and ExpenseList components
const ChartsSection = lazy(() => import("../components/Chart"));
const ExpenseList = lazy(() => import("../components/ExpenseList"));

const Home = () => {
  const [balanceData, setBalanceData] = useState({ income: 0, expenses: 0 });
  const [expenseData, setExpenseData] = useState({ categories: [], amounts: [] });
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expensesData = await getAllExpenses();
        if (expensesData.data.expenses.length > 0) {
          processExpenses(expensesData.data.expenses);
        } else {
          setFallbackData();
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const processExpenses = (fetchedExpenses) => {
    const balance = { income: 0, expenses: 0 };
    const categories = { Entertainment: 0, Travel: 0, Investment: 0, Groceries: 0 };

    fetchedExpenses.forEach((expense) => {
      if (expense.type === "expense") {
        balance.expenses += expense.amount;
      } else {
        balance.income += expense.amount;
      }
      categories[expense.category.charAt(0).toUpperCase() + expense.category.slice(1)] += expense.amount;
    });

    setBalanceData(balance);
    setExpenseData({
      categories: Object.keys(categories),
      amounts: Object.values(categories),
    });
    setExpenses(fetchedExpenses);
  };

  const setFallbackData = () => {
    setBalanceData({ income: 2000, expenses: 1500 });
    setExpenseData({
      categories: ["Entertainment", "Travel", "Investment", "Groceries"],
      amounts: [500, 300, 200, 500],
    });
    setExpenses([
      { id: 1, type: "Income", description: "Salary", amount: 2000, date: "2024-07-01" },
      { id: 2, type: "Expense", description: "Groceries", amount: 100, date: "2024-07-02" },
      { id: 3, type: "Expense", description: "Travel", amount: 400, date: "2024-07-03" },
      { id: 4, type: "Expense", description: "Entertainment", amount: 300, date: "2024-07-02" },
    ]);
  };

  const memoizedBalanceData = useMemo(() => balanceData, [balanceData]);
  const memoizedExpenseData = useMemo(() => expenseData, [expenseData]);
  const memoizedExpenses = useMemo(() => expenses, [expenses]);

  return (
    <BalanceContext.Provider value={{ memoizedBalanceData, memoizedExpenseData }}>
      <div className="flex flex-col min-h-screen">
        <div className="pt-4 px-4 bg-base-100">
          <Navbar />
        </div>
        <main className="flex flex-col lg:flex-row p-4 bg-base-100 text-base-content space-x-4">
        <div className="lg:w-2/3 w-full m-4 text-secondary-content">
            {loading ? <Loader /> : (
              <Suspense fallback={<Loader />}>
                <ExpenseList expenses={memoizedExpenses} />
              </Suspense>
            )}
          </div>
          <div className="lg:w-1/3 w-full m-4">
            {loading ? <Loader /> : (
              <Suspense fallback={<Loader />}>
                <ChartsSection />
              </Suspense>
            )}
          </div>
          
        </main>
        <Footer />
      </div>
    </BalanceContext.Provider>
  );
};

export default Home;
