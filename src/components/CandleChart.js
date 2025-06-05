import React from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-chart-financial'; // side-effect registers controllers/elements
import 'chartjs-plugin-zoom';
import { Chart as ReactChart } from 'react-chartjs-2';

Chart.register(...registerables);

export default function CandleChart({ data }) {
  const config = {
    type: 'candlestick',
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
        x: {
          type: 'time',
          time: { unit: 'hour' }
        },
        y: {
          position: 'right'
        }
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

  return <ReactChart {...config} />;
}
