import {useSelector} from 'react-redux';
import Chart from 'react-apexcharts';
import {selectSeries} from '../store/chart.selectors';

const chart: any = {
  options: {
    chart: {
      foreColor: '#fff',
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'GME',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  },
};

export default function CandleStickChart() {
  const series = useSelector(selectSeries);

  return (
    <div className="pt-10">
      <Chart
        options={chart.options}
        series={series}
        type="candlestick"
        width="100%"
        height={320}
      />
    </div>
  );
}
