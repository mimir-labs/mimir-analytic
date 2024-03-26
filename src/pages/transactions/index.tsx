// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Pagination } from '@mimir-analytic/hooks/types';

import { findEndpoint } from '@mimir-analytic/config';
import { ANALYTIC_API } from '@mimir-analytic/constants';
import { useQueryParam } from '@mimir-analytic/hooks';
import { fetcher } from '@mimir-analytic/utils';
import { Box, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { encodeAddress } from '@polkadot/util-crypto';
import { useEffect, useMemo, useState } from 'react';

import { CalldataStatus, type TransactionData } from './types';

function fetchData(page: number | string, limit: number | string): Promise<Pagination<TransactionData>> {
  return fetcher(`${ANALYTIC_API}transactions?page=${page}&limit=${limit}`);
}

function Transactions() {
  const [page, setPage] = useQueryParam<string>('page', '1');
  const [limit, setLimit] = useQueryParam<string>('limit', '100');
  const [data, setData] = useState<TransactionData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 1, pageSize: 100 });
  const [loading, setLoading] = useState(true);

  const columns = useMemo<GridColDef<TransactionData>[]>(
    () => [
      { field: 'address', headerName: 'Address', sortable: false, renderCell: (item) => encodeAddress(item.row.address), width: 300 },
      { field: 'name', headerName: 'Name', sortable: false, renderCell: (item) => item.row.name || <Chip label='No name' />, width: 140 },
      { field: 'blockTime', headerName: 'Block Time', sortable: false, valueGetter: (_, item) => new Date(parseInt(item.blockTime)), type: 'dateTime', width: 150 },
      { field: 'genesisHash', headerName: 'Chain', sortable: false, width: 150, renderCell: (item) => findEndpoint(item.row.genesisHash).name || 'Unknown' },
      { field: 'action', headerName: 'TxType', sortable: false, width: 200 },
      { field: 'sendFromMimir', headerName: 'From Mimir', sortable: false, width: 100, type: 'boolean' },
      { field: 'status', headerName: 'Status', sortable: false, width: 100, renderCell: (item) => CalldataStatus[item.row.status] },
      { field: 'callHash', headerName: 'CallHash', sortable: false, width: 300 },
      { field: 'website', headerName: 'Website', sortable: false, width: 400 }
    ],
    []
  );

  useEffect(() => {
    setLoading(true);

    fetchData(page, limit)
      .then((data) => {
        setData(data.items);
        setPaginationModel({
          page: data.page - 1,
          pageSize: data.limit
        });
        setTotal(data.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [limit, page]);

  return (
    <Box sx={{ paddingX: 2 }}>
      <DataGrid<TransactionData>
        columns={columns}
        disableColumnFilter
        disableColumnMenu
        loading={loading}
        onPaginationModelChange={(value) => {
          if (value.page + 1 !== Number(page)) {
            setPage((value.page + 1).toString());
          }

          if (value.pageSize !== Number(limit)) {
            setLimit(value.pageSize.toString());
          }
        }}
        pagination
        paginationMode='server'
        paginationModel={paginationModel}
        rowCount={total}
        rows={data}
        sx={({ palette }) => ({
          height: 'calc(100vh - 60px)',
          '.MuiDataGrid-booleanCell[data-value="false"]': {
            color: palette.error.main
          },
          '.MuiDataGrid-booleanCell[data-value="true"]': {
            color: palette.success.main
          }
        })}
      />
    </Box>
  );
}

export default Transactions;
