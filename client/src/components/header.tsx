export default function Header() {
  return (
    <header>
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
    </header>
  );
}
