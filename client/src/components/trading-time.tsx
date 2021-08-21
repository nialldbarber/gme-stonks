interface TradingTimeProps {
  priceTime?: Date;
  tradingEnded?: boolean;
}

export default function TradingTime({
  priceTime,
  tradingEnded,
}: TradingTimeProps) {
  return (
    <div className="pt-1">
      <span className="text-5xl text-gray-100">
        {priceTime && priceTime?.toLocaleTimeString()}
      </span>
      <span className="text-red-500">{tradingEnded && ' (trading ended)'}</span>
    </div>
  );
}
