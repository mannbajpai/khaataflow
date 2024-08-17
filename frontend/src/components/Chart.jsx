import { useContext } from "react";
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import BalanceContext from "../context/BalanceContext";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ChartsSection = () => {
  const { memoizedBalanceData, memoizedExpenseData } = useContext(BalanceContext);
  const doughnutData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Balance',
        data: [memoizedBalanceData.income, memoizedBalanceData.expenses],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  const pieData = {
    labels: memoizedExpenseData.categories,
    datasets: [
      {
        label: 'Expenses',
        data: memoizedExpenseData.amounts,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ],
      },
    ],
  };

  return (
    <div className="grid lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4 w-full overflow-x-auto">
      <div className="card bg-base-300 text-white shadow-xl p-4">
        <div className="card-body">
          <h2 className="card-title text-center text-lg lg:text-xl">Balance Overview</h2>
          <div className="sm:h-[35vh] md:h-[40vh] lg:h-[50vh]">
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>
      <div className="card bg-base-300 text-white shadow-xl p-4">
        <div className="card-body">
          <h2 className="card-title text-center text-lg lg:text-xl">Expense Breakdown</h2>
          <div className="sm:h-[35vh] md:h-[45vh] lg:h-[55vh]">
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;