import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { formatTimestamp } from '../utils/formatDate';

export default function HistoryList() {
  const { history } = usePortfolio();

  if (history.length === 0) {
    return <p className="text-gray-600">No trade history yet.</p>;
  }

  return (
    <div className="bg-white p-6 rounded shadow max-h-96 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-2">Order History</h2>
      <ul className="space-y-2">
        {history
          .slice()
          .reverse()
          .map((o, i) => (
            <li key={i} className="border-b pb-2">
              <p>
                <strong>{o.type}</strong> {o.qty} {o.symbol} @ $
                {o.price.toFixed(2)}
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
