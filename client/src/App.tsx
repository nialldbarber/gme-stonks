import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {MdTrendingUp, MdTrendingDown} from 'react-icons/md';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import {RingSpinner} from 'react-spinners-kit';
import {
  selectPrice,
  selectPriceGBP,
  selectPrevPrice,
} from './store/stonks.selectors';
import {
  selectPrevTradingTime,
  selectTradingEnded,
} from './store/trading.selectors';
import {
  selectCurrency,
  selectLoading,
  selectError,
} from './store/config.selectors';
import {
  setPrice,
  setPriceGBP,
  setPrevPrice,
  setPriceTime,
} from './store/stonks.slices';
import {setPrevTradingTime} from './store/trading.slices';
import {setLoading, setError} from './store/config.slices';
import {fetchData, convertUSDToGBP} from './utils';
import TradingTime from './components/trading-time';
import Header from './components/header';
import {END_POINT, centered} from './constants';

const round = (val: number): number | null => (val ? +val.toFixed(2) : null);

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

interface Prices {
  x: Date;
  y: Array<number> | null;
}

export default function App() {
  const dispatch = useDispatch();

  const price = useSelector(selectPrice);
  const priceGBP = useSelector(selectPriceGBP);
  const prevPrice = useSelector(selectPrevPrice);

  const prevTradingTime = useSelector(selectPrevTradingTime);
  const tradingEnded = useSelector(selectTradingEnded);

  const currency = useSelector(selectCurrency);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);

  useEffect(() => {
    let timeoutId: number;

    async function getLatestPrice() {
      try {
        const data = await fetchData(END_POINT);
        const gme = data?.chart?.result[0];
        const time = new Date(gme?.meta?.regularMarketTime * 1000);

        console.log(gme);

        dispatch(setLoading(false));
        dispatch(setPrice(gme?.meta?.regularMarketPrice?.toFixed(2)));
        dispatch(setPrevPrice(price));
        dispatch(setPriceTime(time));

        const quote = gme.indicators.quote[0];
        const prices = gme.timestamp.map(
          (timestamp: number, i: number): any => {
            return {
              x: new Date(timestamp * 1000),
              y: [
                quote.open[i],
                quote.high[i],
                quote.low[i],
                quote.close[i],
              ].map(round),
            };
          }
        );

        setSeries([
          {
            data: prices,
          },
        ]);

        dispatch(setPrevTradingTime(time));
      } catch (err) {
        dispatch(setLoading(false));
        dispatch(setError(true));
        console.log(err);
      }

      // if (prevTradingTime?.getTime() === time?.getTime()) {
      //   setTradingEnded(true);
      // }

      timeoutId = setTimeout(getLatestPrice, 5000);
    }
    timeoutId = setTimeout(getLatestPrice, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const gbp = convertUSDToGBP(price);
    dispatch(setPriceGBP(Number(gbp)));
  }, [price]);

  if (loading)
    return (
      <div className={centered}>
        <RingSpinner />
      </div>
    );
  if (error) return <div className={centered}>Error loading data</div>;

  return (
    <div className="bg-gray-900 h-screen px-10 py-5">
      <Header />
      <div className="grid grid-cols-1 divide-y divide-red-500">
        {price === -1 ? (
          <p className="text-6xl text-gray-100">-</p>
        ) : (
          <>
            <p
              className={`flex items-baseline text-7xl text-gray-100 pb-4 text-${
                prevPrice < price ? 'green' : 'red'
              }-500`}
            >
              {currency === 'USD' ? `$${price}` : `£${priceGBP}`}
              <span className="pl-2">
                {prevPrice < price ? (
                  <MdTrendingUp size={40} />
                ) : (
                  <MdTrendingDown size={40} />
                )}
              </span>
            </p>
            <TradingTime />
          </>
        )}
      </div>
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
