import {useSelector, useDispatch} from 'react-redux';
import {setCurrency} from '../store/config.slices';
import {selectCurrency} from '../store/config.selectors';

export default function Header() {
  const dispatch = useDispatch();

  const currency = useSelector(selectCurrency);

  function toggleCurrencySwitch() {
    if (currency === 'USD') {
      dispatch(setCurrency('GBP'));
    } else {
      dispatch(setCurrency('USD'));
    }
  }

  return (
    <header>
      <button
        className="absolute absolute top-3 right-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={toggleCurrencySwitch}
      >
        {currency === 'USD' ? 'GBP' : 'USD'}
      </button>
      <h1 className="text-8xl font-normal leading-normal m-0 text-gray-100">
        GME
      </h1>
    </header>
  );
}
