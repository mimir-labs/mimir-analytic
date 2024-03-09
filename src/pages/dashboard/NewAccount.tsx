// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ChartData } from 'chart.js';
import type { NewAccountDaily } from './types';

import { useTheme } from '@mui/material';
import moment from 'moment';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'New accounts added daily'
    }
  }
};

function NewAccount({ data }: { data: NewAccountDaily[] }) {
  const { palette } = useTheme();

  const chartData: ChartData<'bar', number[], string> = useMemo(
    () => ({
      labels: data.map((item) => moment(Number(item.time)).format('YYYY-MM-DD')),
      datasets: [
        {
          label: 'New Account',
          data: data.map((data) => data.counts),
          borderColor: palette.divider,
          backgroundColor: palette.primary.main
        }
      ]
    }),
    [data, palette]
  );

  return <Bar data={chartData} options={options} />;
}

export default React.memo(NewAccount);
