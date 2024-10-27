// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { ChartData } from 'chart.js';
import type { DailyWithChain } from './types';

import { ACCOUNTS_API } from '@mimir-analytic/constants';
import moment from 'moment';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import useSWR from 'swr';

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Proxy daily'
    }
  }
};

function ProxyDaily({ genesisHash }: { genesisHash: HexString }) {
  const { data } = useSWR<DailyWithChain[]>(`${ACCOUNTS_API}daily/proxy/${genesisHash}`);
  const list = useMemo(() => (data || []).slice(-90), [data]);

  const chartData: ChartData<'bar', number[], string> = useMemo(
    () => ({
      labels: list.map((item) => moment(Number(item.time)).format()),
      datasets: [
        {
          label: 'All Proxy',
          data: list.map((item) => item.counts),
          backgroundColor: '#5F45FF'
        },
        {
          label: 'Mimir Proxy',
          data: list.map((item) => item.mimirCounts),
          backgroundColor: '#00DBA6'
        }
      ]
    }),
    [list]
  );

  return <Bar data={chartData} options={options} />;
}

export default React.memo(ProxyDaily);
