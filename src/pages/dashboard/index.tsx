// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BalancesDaily, NewAccountDaily, TransactionsDaily } from './types';

import { ANALYTIC_API } from '@mimir-analytic/constants';
import { Box, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import useSWR from 'swr';

import Balances from './Balances';
import NewAccount from './NewAccount';
import Transactions from './Transactions';

function Dashboard() {
  const { data: newAccountData } = useSWR<NewAccountDaily[]>(`${ANALYTIC_API}history/new-accounts`);
  const { data: balancesData } = useSWR<BalancesDaily[]>(`${ANALYTIC_API}history/balances`);
  const { data: transactionsData } = useSWR<TransactionsDaily[]>(`${ANALYTIC_API}history/transactions`);
  const { palette } = useTheme();

  return (
    <Box>
      <Grid columns={{ xs: 12 }} container spacing={{ xs: 2, sm: 4 }}>
        <Grid md={6} xs={12}>
          {newAccountData && <NewAccount data={newAccountData} />}
        </Grid>
        <Grid md={6} xs={12}>
          {transactionsData && <Transactions data={transactionsData} />}
        </Grid>
        <Grid md={6} xs={12}>
          {balancesData && (
            <Balances balanceKeys={['dot_balance_usd', 'ksm_balance_usd', 'total_usd']} colors={['rgb(230, 0, 122)', '#000', palette.primary.main]} data={balancesData} title='USD Balances' />
          )}
        </Grid>
        <Grid md={6} xs={12}>
          {balancesData && <Balances balanceKeys={['dot_balance']} colors={['rgb(230, 0, 122)']} data={balancesData} title='DOT Balance' />}
        </Grid>
        <Grid md={6} xs={12}>
          {balancesData && <Balances balanceKeys={['ksm_balance']} colors={['rgb(230, 0, 122)']} data={balancesData} title='KSM Balance' />}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
