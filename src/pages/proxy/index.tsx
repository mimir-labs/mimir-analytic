// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { RelationType } from './types';

import { allEndpoints } from '@mimir-analytic/config';
import { ACCOUNTS_API } from '@mimir-analytic/constants';
import { useQueryParam } from '@mimir-analytic/hooks';
import { Box, FormControlLabel, Paper, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tabs } from '@mui/material';
import { encodeAddress } from '@polkadot/util-crypto';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import useSWR from 'swr';

function Proxy() {
  const [onlyMimir, setOnlyMimir] = useState(false);
  const [chain, setChain] = useQueryParam<HexString>('chain', allEndpoints[0].genesisHash);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  const { data } = useSWR<{ page: number; total: number; items: RelationType[] }>(
    `${ACCOUNTS_API}relations/proxy/${chain}?page=${page}&page_size=100&fields=id.${sort}&${onlyMimir ? '&is_mimir=true' : ''}`
  );

  const endpoint = useMemo(() => allEndpoints.find((item) => item.genesisHash === chain), [chain]);

  return (
    <>
      <Tabs onChange={(_, value) => setChain(value)} value={chain} variant='scrollable'>
        {allEndpoints.map((item) => (
          <Tab key={item.genesisHash} label={item.name} value={item.genesisHash} />
        ))}
      </Tabs>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100dvh - 160px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Proxy</TableCell>
                <TableCell>Proxied</TableCell>
                <TableCell>Proxy Type</TableCell>
                <TableCell>Delay</TableCell>
                <TableCell>Review Windows</TableCell>
                <TableCell>From Mimir</TableCell>
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
                  <TableCell>{encodeAddress(item.startAddress, endpoint?.ss58Format)}</TableCell>
                  <TableCell>{encodeAddress(item.endAddress, endpoint?.ss58Format)}</TableCell>
                  <TableCell>{item.proxyType}</TableCell>
                  <TableCell>{item.delay > 0 ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{item.delay}</TableCell>
                  <TableCell>{item.isMimir ? 'Yes' : 'No'}</TableCell>
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

export default React.memo(Proxy);
