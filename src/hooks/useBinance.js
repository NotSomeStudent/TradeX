import { useEffect, useState } from 'react';

export function useBinance(symbol = 'btcusdt') {
  const [data, setData] = useState({
    price: 0,
    change: 0,
    high: 0,
    low: 0
  });

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}@ticker`
    );

    ws.onmessage = (event) => {
      const d = JSON.parse(event.data);
      setData({
        price: parseFloat(d.c),
        change: parseFloat(d.P),
        high: parseFloat(d.h),
        low: parseFloat(d.l)
      });
    };

    ws.onerror = () => ws.close();
    ws.onclose = () => {
      // Optionally implement a REST fallback here
    };

    return () => ws.close();
  }, [symbol]);

  return data;
}
