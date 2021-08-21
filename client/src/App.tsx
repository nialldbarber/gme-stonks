import {useEffect, useState} from 'react';
import {Cashify} from 'cashify';
import {END_POINT} from './constants';

interface StonksData {
  chart: {
    error: null;
    result: any;
  };
}

function convertUSDToGBP(usd: number): string {
  const rates = {
    USD: 1,
    GBP: 0.73407228,
  };
  const cashify = new Cashify({base: 'USD', rates});
  const result = cashify
    .convert(usd, {
      from: 'USD',
      to: 'GBP',
    })
    .toFixed(2);
  return result;
}

async function fetchData(url: string): Promise<StonksData> {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export default function App() {
  const [price, setPrice] = useState<number>(-1);
  const [priceGBP, setPriceGBP] = useState<number>(-1);
  const [priceTime, setPriceTime] = useState<null | Date>(null);
  const [prevTradingTime, setPrevTradingTime] = useState<null | Date>(null);
  const [tradingEnded, setTradingEnded] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>('USD');

  useEffect(() => {
    let timeoutId: number;

    async function getLatestPrice() {
      const data = await fetchData(END_POINT);
      const gme = data.chart.result[0];
      const time = new Date(gme.meta.regularMarketTime * 1000);

      setPrice(gme.meta.regularMarketPrice.toFixed(2));
      setPriceTime(time);
      setPrevTradingTime(time);

      if (prevTradingTime?.getTime() === time?.getTime()) {
        setTradingEnded(true);
      }

      timeoutId = setTimeout(getLatestPrice, 5000);
    }
    timeoutId = setTimeout(getLatestPrice, 5000);

    return () => clearTimeout(timeoutId);
  }, [prevTradingTime]);

  useEffect(() => {
    const gbp = convertUSDToGBP(price);
    setPriceGBP(Number(gbp));
  }, [price]);

  return (
    <div className="container">
      <button
        className="absolute absolute top-3 right-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => {
          if (currency === 'USD') {
            setCurrency('GBP');
          } else {
            setCurrency('USD');
          }
        }}
      >
        {currency === 'USD' ? 'GBP' : 'USD'}
      </button>
      <div className="grid grid-cols-1 divide-y divide-yellow-500">
        {price === -1 ? (
          <p className="text-6xl">-</p>
        ) : (
          <>
            <p className="text-6xl">
              {currency === 'USD' ? `$${price}` : `£${priceGBP}`}
            </p>
            <div>
              <span
                className={`text-6xl text-${
                  tradingEnded ? 'red' : 'green'
                }-500`}
              >
                {priceTime && priceTime.toLocaleTimeString()}
              </span>
              <span className="text-red-500">
                {tradingEnded && ' (trading ended!)'}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
