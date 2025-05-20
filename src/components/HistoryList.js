import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { formatTimestamp } from '../utils/formatDate';

export default function HistoryList() {
  const { history } = usePortfolio();
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Order History</h2>
      <ul className="space-y-2 max-h-96 overflow-y-auto">
        {history
          .slice()
          .reverse()
          .map((o, i) => (
            <li key={i} className="bg-white p-2 rounded shadow-sm">
              <p>
                <strong>{o.type}</strong> {o.qty} {o.symbol} @ ${o.price.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                {formatTimestamp(o.time)}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}
