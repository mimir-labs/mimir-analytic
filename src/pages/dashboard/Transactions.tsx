// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ChartData } from 'chart.js';
import type { TransactionsDaily } from './types';

import { useTheme } from '@mui/material';
import moment from 'moment';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

function Transactions({ data }: { data: TransactionsDaily[] }) {
  const { palette } = useTheme();

  const options = useMemo(
    () => ({
      responsive: true,
      interaction: {
        mode: 'index' as const,
        intersect: false
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Transactions Daily'
        }
      },
      scales: {
        y: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const
        },
        y1: {
          type: 'linear' as const,
          display: true,
          position: 'right' as const,
          grid: {
            drawOnChartArea: false
          }
        }
      }
    }),
    []
  );
  const chartData: ChartData<'line', number[], string> = useMemo(
    () => ({
      labels: data.map((item) => moment(Number(item.time)).format('YYYY-MM-DD')),
      datasets: [
        {
          label: 'Total',
          data: data.map((data) => data.counts),
          borderColor: palette.success.main,
          backgroundColor: palette.success.main
        },
        {
          label: 'Mimir',
          data: data.map((data) => data.mimirCounts),
          borderColor: palette.primary.main,
          backgroundColor: palette.primary.main
        }
      ]
    }),
    [data, palette]
  );

  return <Line data={chartData} options={options} />;
}

export default React.memo(Transactions);
