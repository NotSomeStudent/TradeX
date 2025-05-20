import React, { useState } from 'react';
import { useBinance } from '../hooks/useBinance';
import { usePortfolio } from '../context/PortfolioContext';

export default function TradeForm() {
  const [symbol, setSymbol] = useState('btcusdt');
  const [qty, setQty] = useState('');
  const { price } = useBinance(symbol);
  const { cash, positions, buy, sell } = usePortfolio();

  const handleBuy = () => {
    buy(symbol.toUpperCase(), Number(qty), price);
    setQty('');
  };

  const handleSell = () => {
    sell(symbol.toUpperCase(), Number(qty), price);
    setQty('');
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Trade</h2>
      <label className="block">
        Symbol:
        <input
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          className="ml-2 border rounded px-2"
        />
      </label>
      <label className="block">
        Quantity:
        <input
          type="number"
          value={qty}
          onChange={e => setQty(e.target.value)}
          className="ml-2 w-24 border rounded px-2"
        />
      </label>
      <p>Price: ${price.toFixed(2)}</p>
      <p>
        Estimated Cost: ${(qty * price * 1.001).toFixed(2)} (incl. 0.1% fee)
      </p>
      <div className="space-x-4">
        <button
          onClick={handleBuy}
          disabled={qty * price * 1.001 > cash}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          Buy
        </button>
        <button
          onClick={handleSell}
          disabled={Number(qty) > (positions[symbol.toUpperCase()] || 0)}
          className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
        >
          Sell
        </button>
      </div>
    </div>
  );
}
