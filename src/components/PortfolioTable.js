import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useBinance } from '../hooks/useBinance';

export default function PortfolioTable() {
  const { cash, positions } = usePortfolio();
  const symbols = Object.keys(positions);
  const totalValue = symbols.reduce((sum, sym) => {
    const { price } = useBinance(sym.toLowerCase());
    return sum + (positions[sym] || 0) * price;
  }, cash);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Account</h2>
      <p>Cash: ${cash.toFixed(2)}</p>
      <p>Total Value: ${totalValue.toFixed(2)}</p>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Symbol</th>
            <th className="border-b p-2">Qty</th>
            <th className="border-b p-2">Current</th>
            <th className="border-b p-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {symbols.map(sym => {
            const qty = positions[sym];
            const { price } = useBinance(sym.toLowerCase());
            return (
              <tr key={sym}>
                <td className="p-2">{sym}</td>
                <td className="p-2">{qty.toFixed(4)}</td>
                <td className="p-2">${price.toFixed(2)}</td>
                <td className="p-2">
                  ${(qty * price).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
