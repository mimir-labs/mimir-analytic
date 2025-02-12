// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountData } from './types';

import { ACCOUNTS_API } from '@mimir-analytic/constants';
import { Box, FormControlLabel, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material';
import { encodeAddress } from '@polkadot/util-crypto';
import moment from 'moment';
import { useState } from 'react';
import useSWR from 'swr';

function Accounts() {
  const [onlyMimir, setOnlyMimir] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  const { data } = useSWR<{ page: number; total: number; items: AccountData[] }>(
    `${ACCOUNTS_API}account/list?page=${page}&page_size=100&fields=created_at.${sort}&${onlyMimir ? '&is_mimir=true' : ''}`
  );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 'calc(100dvh - 120px)' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>name</TableCell>
              <TableCell>From Mimir</TableCell>
              <TableCell>Type</TableCell>
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
                <TableCell>{encodeAddress(item.address)}</TableCell>
                <TableCell>{item.name || 'no name'}</TableCell>
                <TableCell>{item.isMimir ? 'Yes' : 'No'}</TableCell>
                <TableCell>{item.type}</TableCell>
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
  );
}

export default Accounts;
