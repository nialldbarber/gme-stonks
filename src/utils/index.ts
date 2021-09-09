import {Cashify} from 'cashify';

interface StonksData {
  chart: {
    error: null;
    result: any;
  };
}

export async function fetchData(url: string) {
  const abortController = new AbortController();
  try {
    const response = await fetch(url, {
      signal: abortController.signal,
    });
    const json = await response.json();
    return json;
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      return;
    }
    console.log('Error', err);
  } finally {
    abortController.abort();
  }
}

export function convertUSDToGBP(usd: number): string {
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

export const round = (val: number): number | null =>
  val ? +val.toFixed(2) : null;
