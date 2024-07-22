import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Balance',
        data: [data.income, data.expenses],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  return <Pie data={chartData} />;
};

ChartComponent.propTypes = {
    data: PropTypes.object.isRequired,
}


export default ChartComponent;
