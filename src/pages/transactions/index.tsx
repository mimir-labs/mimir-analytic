// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { allEndpoints } from '@mimir-analytic/config';
import { ACCOUNTS_API } from '@mimir-analytic/constants';
import { useQueryParam } from '@mimir-analytic/hooks';
import { Box, FormControlLabel, Paper, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tabs } from '@mui/material';
import { encodeAddress } from '@polkadot/util-crypto';
import moment from 'moment';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

import { type TransactionResponse, TransactionStatus } from './types';

function Transactions() {
  const [chain, setChain] = useQueryParam<string>('chain', allEndpoints[0].key);
  const [onlyMimir, setOnlyMimir] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  const { data } = useSWR<{ page: number; total: number; items: TransactionResponse[] }>(
    `${ACCOUNTS_API}transactions/${chain}?page=${page}&page_size=100&fields=created_at.${sort}&${onlyMimir ? '&is_mimir=true' : ''}`
  );

  const currentEndpoint = useMemo(() => allEndpoints.find((item) => item.key === chain), [chain]);

  return (
    <>
      <Tabs onChange={(_, value) => setChain(value)} value={chain} variant='scrollable'>
        {allEndpoints.map((item) => (
          <Tab key={item.key} label={item.name} value={item.key} />
        ))}
      </Tabs>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100dvh - 160px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>Real Address</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>From Mimir</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>CallHash</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={sort}
                    onClick={() => {
                      setSort(sort === 'desc' ? 'asc' : 'desc');
                    }}
                  >
                    Created Time
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{encodeAddress(item.address, currentEndpoint?.ss58Format)}</TableCell>
                  <TableCell>{item.realAddress ? encodeAddress(item.realAddress, currentEndpoint?.ss58Format) : ''}</TableCell>
                  <TableCell>
                    {item.section}.{item.method}
                  </TableCell>
                  <TableCell>{item.sendFromMimir ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{TransactionStatus[item.status]}</TableCell>
                  <TableCell>{item.hash}</TableCell>
                  <TableCell>{item.website}</TableCell>
                  <TableCell>{moment(item.createdAt).format()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: 2, bgcolor: 'secondary.main' }}>
          <FormControlLabel control={<Switch checked={onlyMimir} onChange={(e) => setOnlyMimir(e.target.checked)} />} label='Only Mimir' />
          <TablePagination component='div' count={data?.total || 0} onPageChange={(_, page) => setPage(page + 1)} page={page - 1} rowsPerPage={100} rowsPerPageOptions={[100]} />
        </Box>
      </Paper>
    </>
  );
}

export default Transactions;
