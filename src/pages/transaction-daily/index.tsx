// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TransactionsDaily } from '../dashboard/types';

import { ANALYTIC_API } from '@mimir-analytic/constants';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import useSWR from 'swr';

function TransactionDailyt() {
  const { data: transactionsData } = useSWR<TransactionsDaily[]>(`${ANALYTIC_API}history/transactions`);

  const columns = useMemo<GridColDef<TransactionsDaily>[]>(
    () => [
      { field: 'time', headerName: 'Day', valueGetter: (_, row) => new Date(Number(row.time)), width: 300, type: 'date' },
      { field: 'mimirCounts', headerName: 'Mimir', width: 140, type: 'number' },
      { field: 'counts', headerName: 'All', type: 'number', width: 150 }
    ],
    []
  );

  const rows = useMemo(() => transactionsData?.map((item) => ({ ...item, id: item.time })) || [], [transactionsData]);

  return (
    <Box sx={{ paddingX: 2 }}>
      <DataGrid<TransactionsDaily> columns={columns} disableColumnFilter disableColumnMenu loading={false} rows={rows} />
    </Box>
  );
}

export default TransactionDailyt;
