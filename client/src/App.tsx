import { useEffect, useState } from "react";

const stonksURL = "https://yahoo-finance-api.vercel.app/GME";

interface StonksData {
	chart: {
		error: null;
		result: any;
	};
}

async function fetchData(url: string): Promise<StonksData> {
	const response = await fetch(url);
	const json = await response.json();
	return json;
}

export default function App() {
	const [price, setPrice] = useState<number>(-1);
	const [priceTime, setPriceTime] = useState<null | Date>(null);
	const [prevTradingTime, setPrevTradingTime] = useState<null | Date>(null);
	const [tradingEnded, setTradingEnded] = useState<boolean>(false);

	useEffect(() => {
		let timeoutId: number;

		async function getLatestPrice() {
			const data = await fetchData(stonksURL);
			const gme = data.chart.result[0];
			const time = new Date(gme.meta.regularMarketTime * 1000);

			setPrice(gme.meta.regularMarketPrice.toFixed(2));
			setPriceTime(time);
			setPrevTradingTime(time);

			if (prevTradingTime?.getTime() === time?.getTime()) {
				setTradingEnded(true);
			}

			console.log(gme.meta);

			timeoutId = setTimeout(getLatestPrice, 5000);
		}

		timeoutId = setTimeout(getLatestPrice, 5000);

		return () => clearTimeout(timeoutId);
	}, [prevTradingTime]);

	// if time is >= 21:00: trading closed

	return (
		<div className="grid grid-cols-1 divide-y divide-yellow-500">
			<p className="text-6xl">{price}</p>
			<div>
				<span className={`text-6xl text-${tradingEnded ? "red" : "green"}-500`}>
					{priceTime && priceTime.toLocaleTimeString()}
				</span>
				<span className="text-red-500">{tradingEnded && " (trading ended!  )"}</span>
			</div>
		</div>
	);
}
