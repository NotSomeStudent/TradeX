
import React from 'react';
import { Chart, registerables } from 'chart.js';
import {
  FinancialController,
  CandlestickElement
} from 'chartjs-chart-financial';
import { Chart as ReactChart } from 'react-chartjs-2';

Chart.register(
  ...registerables,
  FinancialController,
  CandlestickElement
);

export default function CandleChart({ data }) {
  const cfg = {
    data: {
      datasets: [
        {
          label: 'Price',
          data
        }
      ]
    },
    options: {
      scales: {
        x: { type: 'time', time: { unit: 'hour' } },
        y: { position: 'right' }
      },
      plugins: {
        zoom: {
          zoom: {
            wheel: { enabled: true },
            pinch: { enabled: true },
            mode: 'x'
          }
        }
      }
    }
  };
  return <ReactChart type="candlestick" {...cfg} />;
}
