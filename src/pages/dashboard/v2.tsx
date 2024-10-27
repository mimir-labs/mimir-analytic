// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { allEndpoints } from '@mimir-analytic/config';
import { useQueryParam } from '@mimir-analytic/hooks';
import { Box, Tab, Tabs } from '@mui/material';

import ProxyDaily from './ProxyDaily';
import TransactionDaily from './TransactionDaily';

function Dashboard() {
  const [tab, setTab] = useQueryParam<'tx' | 'proxy'>('tab', 'tx');
  const [chain, setChain] = useQueryParam<string>('chain', allEndpoints[0].key);
  const genesisHash: HexString = allEndpoints.find((item) => item.key === chain)?.genesisHash || '0x';

  return (
    <>
      <Tabs onChange={(_, value) => setChain(value)} value={chain}>
        {allEndpoints.map((item) => (
          <Tab key={item.key} label={item.name} value={item.key} />
        ))}
      </Tabs>
      <Box sx={{ padding: 2 }}>
        <Tabs onChange={(_, value) => setTab(value)} value={tab}>
          <Tab label='Transactions' value='tx' />
          <Tab label='Proxy' value='proxy' />
        </Tabs>
        <Box>{tab === 'tx' && <TransactionDaily genesisHash={genesisHash} />}</Box>
        <Box>{tab === 'proxy' && <ProxyDaily genesisHash={genesisHash} />}</Box>
      </Box>
    </>
  );
}

export default Dashboard;
