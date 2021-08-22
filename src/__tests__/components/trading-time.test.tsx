import {render, screen} from '@testing-library/react';
import TradingTime from '../../components/trading-time';

test('renders learn react link', () => {
  render(<TradingTime />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();

  // expect priceTime && tradingEnded toBeInTheDocument
});
