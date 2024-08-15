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
        <div className="grid grid-cols-1">
            <div className="card bg-base-300 text-white shadow-xl mx-2 w-2/3 min-w-8 m-2">
                <div className="card-body">
                    <h2 className="card-title text-center">Balance Overview</h2>
                    <div className="h-[40vh]">
                        <Doughnut data={doughnutData} />
                    </div>
                </div>
            </div>
            <div className="card bg-base-300 text-white shadow-xl mx-2 w-2/3 min-w-8 m-2">
                <div className="card-body">
                    <h2 className="card-title text-center">Expense Breakdown</h2>
                    <div className="h-[45vh]">
                        <Pie data={pieData} />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ChartsSection;
