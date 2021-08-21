import {useSelector} from 'react-redux';
import {selectPriceTime} from '../store/stonks.selectors';
import {selectTradingEnded} from '../store/trading.selectors';

export default function TradingTime() {
  const priceTime = useSelector(selectPriceTime);
  const tradingEnded = useSelector(selectTradingEnded);

  return (
    <div className="pt-1">
      <span className="text-5xl text-gray-100">
        <span className="text-5xl text-gray-100">
          {priceTime && priceTime?.toLocaleTimeString()}
        </span>
      </span>
      <span className="text-red-500">{tradingEnded && ' (trading ended)'}</span>
    </div>
  );
}
