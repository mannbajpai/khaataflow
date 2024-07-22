import PropTypes from 'prop-types';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ChartsSection = ({ balanceData, expenseData }) => {
    const doughnutData = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                label: 'Balance',
                data: [balanceData.income, balanceData.expenses],
                backgroundColor: ['#4CAF50', '#F44336'],
            },
        ],
    };

    const pieData = {
        labels: expenseData.categories,
        datasets: [
            {
                label: 'Expenses',
                data: expenseData.amounts,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                ],
            },
        ],
    };

    return (
        <div className="grid grid-cols-2">
            <div className="card bg-base-300 text-white shadow-xl mx-2">
                <div className="card-body">
                    <h2 className="card-title text-center">Balance Overview</h2>
                    <div className="h-[30vh]">
                        <Doughnut data={doughnutData} />
                    </div>
                </div>
            </div>
            <div className="card bg-base-300 text-white shadow-xl mx-2">
                <div className="card-body">
                    <h2 className="card-title text-center">Expense Breakdown</h2>
                    <div className="h-[30vh]">
                        <Pie data={pieData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

ChartsSection.propTypes = {
    balanceData: PropTypes.object.isRequired,
    expenseData: PropTypes.object.isRequired,
}


export default ChartsSection;
