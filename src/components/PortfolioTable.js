import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useBinance } from '../hooks/useBinance';

export default function PortfolioTable() {
  const { cash, positions } = usePortfolio();
  const symbols = Object.keys(positions).filter((sym) => positions[sym] > 0);

  // Compute total portfolio value (cash + positions)
  const totalValue = symbols.reduce((sum, sym) => {
    const { price } = useBinance(sym.toLowerCase());
    return sum + positions[sym] * price;
  }, cash);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Account</h2>
      <p>Cash: ${cash.toFixed(2)}</p>
      <p>Total Value: ${totalValue.toFixed(2)}</p>

      {symbols.length === 0 ? (
        <p className="mt-4 text-gray-600">No holdings yet.</p>
      ) : (
        <table className="w-full mt-4 text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Symbol</th>
              <th className="border-b p-2">Qty</th>
              <th className="border-b p-2">Current Price</th>
              <th className="border-b p-2">Position Value</th>
            </tr>
          </thead>
          <tbody>
            {symbols.map((sym) => {
              const qty = positions[sym];
              const { price } = useBinance(sym.toLowerCase());
              return (
                <tr key={sym}>
                  <td className="p-2">{sym}</td>
                  <td className="p-2">{qty.toFixed(4)}</td>
                  <td className="p-2">${price.toFixed(2)}</td>
                  <td className="p-2">${(qty * price).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
