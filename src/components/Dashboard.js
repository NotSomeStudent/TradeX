import React, { useState, useEffect } from 'react';
import { useBinance } from '../hooks/useBinance';
import CandleChart from './CandleChart';
import OrderBook from './OrderBook';

export default function Dashboard() {
  const [symbol, setSymbol] = useState('btcusdt');
  const { price, change, high, low } = useBinance(symbol);
  const [ohlc, setOhlc] = useState([]);

  // fetch historical
  useEffect(() => {
    fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=1h&limit=100`
    )
      .then(r => r.json())
      .then(data => {
        const formatted = data.map(d => ({
          x: d[0],
          o: +d[1],
          h: +d[2],
          l: +d[3],
          c: +d[4]
        }));
        setOhlc(formatted);
      });
  }, [symbol]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          {symbol.toUpperCase()} – ${price.toLocaleString()}
          <span
            className={
              change >= 0 ? 'text-green-500 ml-2' : 'text-red-500 ml-2'
            }
          >
            {change.toFixed(2)}%
          </span>
        </h1>
        <div className="flex space-x-6">
          <p>High: ${high.toFixed(2)}</p>
          <p>Low:  ${low.toFixed(2)}</p>
        </div>
        <CandleChart data={ohlc} />
      </div>
      <OrderBook symbol={symbol} />
    </div>
  );
}
