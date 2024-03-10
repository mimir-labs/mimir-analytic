// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Pagination } from '@mimir-analytic/hooks/types';
import type { AccountData } from './types';

import { FormatBalance } from '@mimir-analytic/components';
import { kusamaEndpoints, polkadotEndpoints, testnetEndpoints } from '@mimir-analytic/config';
import { ANALYTIC_API } from '@mimir-analytic/constants';
import { useQueryParam } from '@mimir-analytic/hooks';
import { chainLinks, fetcher } from '@mimir-analytic/utils';
import { Box, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { HexString } from '@polkadot/util/types';
import { encodeAddress } from '@polkadot/util-crypto';
import { useEffect, useMemo, useState } from 'react';

function fetchData(page: number | string, limit: number | string): Promise<Pagination<AccountData>> {
  return fetcher(`${ANALYTIC_API}accounts?page=${page}&limit=${limit}`);
}

function Explorer({ address }: { address: HexString }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Link href={chainLinks.accountExplorerLink(polkadotEndpoints[0].genesisHash, address)} target='_blank'>
        <Box component='img' src={polkadotEndpoints[0].icon} width={24} />
      </Link>
      <Link href={chainLinks.accountExplorerLink(kusamaEndpoints[0].genesisHash, address)} target='_blank'>
        <Box component='img' src={kusamaEndpoints[0].icon} width={24} />
      </Link>
      <Link href={chainLinks.accountExplorerLink(testnetEndpoints[0].genesisHash, address)} target='_blank'>
        <Box component='img' src={testnetEndpoints[0].icon} width={24} />
      </Link>
    </Box>
  );
}

function Accounts() {
  const [page, setPage] = useQueryParam<string>('page', '1');
  const [limit, setLimit] = useQueryParam<string>('limit', '100');
  const [data, setData] = useState<AccountData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 1, pageSize: 100 });
  const [loading, setLoading] = useState(true);

  const columns = useMemo<GridColDef<AccountData>[]>(
    () => [
      { field: 'address', headerName: 'Address', sortable: false, renderCell: (item) => encodeAddress(item.row.address), width: 300 },
      { field: 'name', headerName: 'Name', sortable: false, renderCell: (item) => item.row.name || <Chip label='No name' />, width: 140 },
      { field: 'createdAt', headerName: 'CreatedAt', sortable: false, valueGetter: (item) => new Date(item.row.createdAt), type: 'dateTime', width: 150 },
      { field: 'type', headerName: 'Type', sortable: false, renderCell: (item) => (item.row.type === 'proxy' ? 'Flexible' : 'Static'), width: 100 },
      {
        field: 'members',
        headerName: 'Members',
        sortable: false,
        renderCell: (item) => item.row.members.map((item) => encodeAddress(item)).join('\n'),
        width: 300
      },
      { field: 'isMimir', headerName: 'From Mimir', sortable: false, width: 100, type: 'boolean' },
      { field: 'dot_balance', headerName: 'DOT Balance', sortable: false, width: 150, renderCell: (item) => <FormatBalance format={[10, 'DOT']} value={item.row.dot_balance} /> },
      { field: 'ksm_balance', headerName: 'KSM Balance', sortable: false, width: 150, renderCell: (item) => <FormatBalance format={[12, 'KSM']} value={item.row.ksm_balance} /> },
      { field: 'total_usd', headerName: 'Total Balance(USD)', sortable: false, width: 150, renderCell: (item) => `$ ${item.row.total_usd}` },
      { field: 'explorer', headerName: 'Explorer', sortable: false, width: 120, renderCell: (item) => <Explorer address={item.row.address} /> }
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
      <DataGrid<AccountData>
        columns={columns}
        disableColumnFilter
        disableColumnMenu
        getRowHeight={() => 'auto'}
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
          '.MuiDataGrid-cell': {
            overflow: 'hidden',
            whiteSpace: 'wrap'
          },
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

export default Accounts;
