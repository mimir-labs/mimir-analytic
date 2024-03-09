// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ChartData } from 'chart.js';
import type { BalancesDaily } from './types';

import { useTheme } from '@mui/material';
import moment from 'moment';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

function Balances({ balanceKeys, colors, data, title }: { title: string; data: BalancesDaily[]; balanceKeys: (keyof BalancesDaily)[]; colors: string[] }) {
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
          text: title
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
    [title]
  );
  const chartData: ChartData<'line', number[], string> = useMemo(
    () => ({
      labels: data.map((item) => moment(Number(item.time)).format('YYYY-MM-DD')),
      datasets: balanceKeys.map((key, index) => ({
        label: key,
        data: data.map((data) => Number(data[key])),
        borderColor: colors[index] || palette.success.main,
        backgroundColor: colors[index] || palette.success.main
      }))
    }),
    [balanceKeys, data, colors, palette]
  );

  return <Line data={chartData} options={options} />;
}

export default React.memo(Balances);
