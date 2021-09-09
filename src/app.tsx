import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {MdTrendingUp, MdTrendingDown} from 'react-icons/md';
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
import {setSeries} from './store/chart.slices';
import {fetchData, convertUSDToGBP, round} from './utils';
import TradingTime from './components/trading-time';
import Header from './components/header';
import CandleStickChart from './components/candle-stick-chart';
import {END_POINT, centered} from './constants';

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

  useEffect(() => {
    let timeoutId: number;

    async function getLatestPrice() {
      try {
        const data = await fetchData(END_POINT);
        const gme = data?.chart?.result[0];
        const time = new Date(gme?.meta?.regularMarketTime * 1000);

        // console.log(gme);

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

        dispatch(
          setSeries([
            {
              data: prices,
            },
          ])
        );

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
      <CandleStickChart />
    </div>
  );
}
