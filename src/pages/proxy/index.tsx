// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { RelationType } from './types';

import { ACCOUNTS_API } from '@mimir-analytic/constants';
import { Box, FormControlLabel, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { encodeAddress } from '@polkadot/util-crypto';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import useSWR from 'swr';

function Proxy() {
  const { data } = useSWR<RelationType[]>(`${ACCOUNTS_API}relations/proxy`);
  const [onlyMimir, setOnlyMimir] = useState(false);

  const list = useMemo(() => (onlyMimir ? data?.filter((item) => item.isMimir) : data), [data, onlyMimir]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ padding: 2, bgcolor: 'secondary.main' }}>
        <FormControlLabel control={<Switch checked={onlyMimir} onChange={(e) => setOnlyMimir(e.target.checked)} />} label='Only Mimir' />
      </Box>
      <TableContainer sx={{ maxHeight: 'calc(100dvh - 140px)' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Proxy</TableCell>
              <TableCell>Proxied</TableCell>
              <TableCell>Proxy Type</TableCell>
              <TableCell>Delay</TableCell>
              <TableCell>Review Windows</TableCell>
              <TableCell>From Mimir</TableCell>
              <TableCell>Created Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{encodeAddress(item.startAddress)}</TableCell>
                <TableCell>{encodeAddress(item.endAddress)}</TableCell>
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
    </Paper>
  );
}

export default React.memo(Proxy);
