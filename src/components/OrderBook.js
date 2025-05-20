import React, { useEffect, useState } from 'react';

export default function OrderBook({ symbol }) {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.binance.com/api/v3/depth?symbol=${symbol.toUpperCase()}&limit=20`
    )
      .then(r => r.json())
      .then(d => {
        setBids(d.bids.map(([p, q]) => ({ price: +p, qty: +q })));
        setAsks(d.asks.map(([p, q]) => ({ price: +p, qty: +q })));
      });
  }, [symbol]);

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="font-semibold mb-2">Order Book</h3>
      <div className="grid grid-cols-2 text-sm">
        <div>
          <h4 className="text-gray-600">Bids</h4>
          {bids.map((b, i) => (
            <div key={i} className="flex justify-between">
              <span>{b.qty.toFixed(4)}</span>
              <span className="text-green-600">{b.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-gray-600">Asks</h4>
          {asks.map((a, i) => (
            <div key={i} className="flex justify-between">
              <span className="text-red-600">{a.price.toFixed(2)}</span>
              <span>{a.qty.toFixed(4)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
