import {useState, useEffect} from 'react';
import {MdTrendingUp, MdTrendingDown} from 'react-icons/md';
import {fetchData, convertUSDToGBP} from './utils';
import TradingTime from './components/trading-time';
import {END_POINT, centered} from './constants';

export default function App() {
  const [price, setPrice] = useState<number>(-1);
  const [priceGBP, setPriceGBP] = useState<number>(-1);
  const [prevPrice, setPrevPrice] = useState<number>(-1);

  const [priceTime, setPriceTime] = useState<null | Date>(null);
  const [prevTradingTime, setPrevTradingTime] = useState<null | Date>(null);
  const [tradingEnded, setTradingEnded] = useState<boolean>(false);

  const [currency, setCurrency] = useState<string>('USD');

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: number;

    async function getLatestPrice() {
      try {
        const data = await fetchData(END_POINT);
        const gme = data.chart.result[0];
        const time = new Date(gme.meta.regularMarketTime * 1000);

        setLoading(false);

        setPrice(gme.meta.regularMarketPrice.toFixed(2));
        setPrevPrice(price);
        setPriceTime(time);
        setPrevTradingTime(time);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log('error');
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
    setPriceGBP(Number(gbp));
  }, [price]);

  if (loading) return <div className={centered}>Loading</div>;
  if (error) return <div className={centered}>Error loading data</div>;

  return (
    <div className="bg-gray-900 h-screen">
      <button
        className="absolute absolute top-3 right-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => {
          if (currency === 'USD') setCurrency('GBP');
          else setCurrency('USD');
        }}
      >
        {currency === 'USD' ? 'GBP' : 'USD'}
      </button>
      <h1 className="text-8xl font-normal leading-normal m-0 text-gray-100">
        GME
      </h1>
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
    </div>
  );
}
