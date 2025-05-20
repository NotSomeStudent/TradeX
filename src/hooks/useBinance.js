import { useEffect, useState } from 'react';

export function useBinance(symbol = 'btcusdt') {
  const [data, setData] = useState({
    price: 0, change: 0, high: 0, low: 0
  });

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}@ticker`
    );

    ws.onmessage = evt => {
      const d = JSON.parse(evt.data);
      setData({
        price: parseFloat(d.c),
        change: parseFloat(d.P),
        high: parseFloat(d.h),
        low: parseFloat(d.l)
      });
    };

    ws.onerror = () => ws.close();
    ws.onclose = () => {
      // could fallback to REST polling here
    };

    return () => ws.close();
  }, [symbol]);

  return data;
}
