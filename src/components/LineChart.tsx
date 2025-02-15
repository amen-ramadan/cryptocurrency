import { Col, Row, Typography } from 'antd';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  TimeSeriesScale,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { memo, useMemo } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  TimeSeriesScale,
  TimeScale
);

const { Title } = Typography;

interface History {
  price: number;
  timestamp: number;
}

interface CoinHistoryData {
  change: number;
  history: History[];
}

interface CoinHistory {
  data?: CoinHistoryData;
}

interface Props {
  coinHistory: CoinHistory;
  currentPrice: string;
  coinName: string;
}

const LineChartComponent = memo(({ coinHistory, currentPrice, coinName }: Props) => {
  const chartData = useMemo(() => {
    if (!coinHistory?.data) return null;
    const coinPrice = coinHistory.data.history.map(item => item.price);
    const coinTimestamp = coinHistory.data.history.map(item => new Date(item.timestamp * 1000));
    return {
      labels: coinTimestamp,
      datasets: [
        {
          label: 'Price In USD',
          data: coinPrice,
          fill: false,
          backgroundColor: '#0071bd',
          borderColor: '#0071bd',
        },
      ],
    };
  }, [coinHistory]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2, 
    plugins: { legend: { display: true } },
    animation: {duration: 3000},
    scales: {
      y: { beginAtZero: true },
      x: {
        type: 'timeseries' as const,
        time: {
          unit: 'day' as const,
        },
      },
    },
  }), []);

  if (!chartData) {
    return <div>Loading data...</div>;
  }

  return (
    <div style={{ maxWidth: '100%', height: '400px', overflow: 'hidden' }}>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>Change: {coinHistory.data?.change}%</Title>
          <Title level={5} className='current-price'>Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={chartData} options={options} height={400} />
    </div>
  );
});

export default LineChartComponent;
