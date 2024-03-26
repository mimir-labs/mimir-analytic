// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Pagination } from '@mimir-analytic/hooks/types';
import type { AccountData } from './types';

import { FormatBalance } from '@mimir-analytic/components';
import { kusamaEndpoints, polkadotEndpoints, testnetEndpoints } from '@mimir-analytic/config';
import { ANALYTIC_API } from '@mimir-analytic/constants';
import { useQueryParam } from '@mimir-analytic/hooks';
import { camelToSnake, chainLinks, fetcher } from '@mimir-analytic/utils';
import { Box, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridFilterModel, GridLogicOperator, GridPaginationModel, GridSortItem } from '@mui/x-data-grid';
import { HexString } from '@polkadot/util/types';
import { encodeAddress } from '@polkadot/util-crypto';
import { useEffect, useMemo, useState } from 'react';

function fetchSearch(page: number | string, limit: number | string, sorts: GridSortItem[], filterModel: GridFilterModel): string {
  const search = new URLSearchParams();

  search.append('page', page.toString());
  search.append('limit', limit.toString());

  const filter = filterModel.items[0];

  if (filter) {
    if (filter.field === 'isMimir') {
      if (filter.value === 'true') {
        search.append('mimir', 'true');
      } else if (filter.value === 'false') {
        search.append('mimir', 'false');
      }
    } else if (filter.field === 'utm_source') {
      filter.value && search.append('utm_source', filter.value);
    }
  }

  const fields = sorts.map((item) => `${camelToSnake(item.field)}.${item.sort}`).join(',');

  search.append('fields', fields);

  search.sort();

  return search.toString();
}

function fetchData(searchStr: string): Promise<Pagination<AccountData>> {
  return fetcher(`${ANALYTIC_API}accounts?${searchStr}`);
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
  const [sorts, setSorts] = useState<GridSortItem[]>([{ field: 'total_usd', sort: 'desc' }]);

  const columns = useMemo<GridColDef<AccountData>[]>(
    () => [
      { field: 'address', headerName: 'Address', filterable: false, sortable: false, renderCell: (item) => encodeAddress(item.row.address), width: 300 },
      { field: 'name', headerName: 'Name', filterable: false, sortable: false, renderCell: (item) => item.row.name || <Chip label='No name' />, width: 140 },
      { field: 'createdAt', headerName: 'CreatedAt', filterable: false, sortingOrder: ['asc', 'desc'], valueGetter: (_, item) => new Date(item.createdAt), type: 'dateTime', width: 150 },
      { field: 'type', headerName: 'Type', filterable: false, sortable: false, renderCell: (item) => (item.row.type === 'proxy' ? 'Flexible' : 'Static'), width: 100 },
      {
        field: 'members',
        headerName: 'Members',
        filterable: false,
        sortable: false,
        renderCell: (item) => item.row.members.map((item) => encodeAddress(item)).join('\n'),
        width: 300
      },
      {
        field: 'isMimir',
        headerName: 'From Mimir',
        sortable: false,
        width: 150,
        type: 'boolean'
      },
      { field: 'utm_source', headerName: 'utm source', sortable: false, width: 150, type: 'string' },
      { field: 'dot_balance', headerName: 'DOT Balance', filterable: false, sortable: false, width: 150, renderCell: (item) => <FormatBalance format={[10, 'DOT']} value={item.row.dot_balance} /> },
      { field: 'ksm_balance', headerName: 'KSM Balance', filterable: false, sortable: false, width: 150, renderCell: (item) => <FormatBalance format={[12, 'KSM']} value={item.row.ksm_balance} /> },
      { field: 'total_usd', headerName: 'Total Balance(USD)', filterable: false, sortingOrder: ['asc', 'desc'], width: 150, renderCell: (item) => `$ ${item.row.total_usd}` },
      { field: 'explorer', headerName: 'Explorer', filterable: false, sortable: false, width: 120, renderCell: (item) => <Explorer address={item.row.address} /> },
      { field: 'utm_medium', headerName: 'utm medium', filterable: false, sortable: false, width: 150 },
      { field: 'utm_campaign', headerName: 'utm campaign', filterable: false, sortable: false, width: 150 }
    ],
    []
  );
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [
      { id: 0, field: 'isMimir', value: 'any', operator: 'is' },
      { id: 1, field: 'utm_source', value: 'any', operator: 'equals' }
    ],
    logicOperator: GridLogicOperator.And
  });

  const searchStr = fetchSearch(page, limit, sorts, filterModel);

  useEffect(() => {
    setLoading(true);

    fetchData(searchStr)
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
  }, [searchStr]);

  return (
    <Box sx={{ paddingX: 2 }}>
      <DataGrid<AccountData>
        columns={columns}
        disableColumnFilter={false}
        disableColumnMenu={false}
        filterDebounceMs={300}
        filterMode='server'
        filterModel={filterModel}
        getRowHeight={() => 'auto'}
        loading={loading}
        onFilterModelChange={setFilterModel}
        onPaginationModelChange={(value) => {
          if (value.page + 1 !== Number(page)) {
            setPage((value.page + 1).toString());
          }

          if (value.pageSize !== Number(limit)) {
            setLimit(value.pageSize.toString());
          }
        }}
        onSortModelChange={setSorts}
        pagination
        paginationMode='server'
        paginationModel={paginationModel}
        rowCount={total}
        rows={data}
        sortModel={sorts}
        sortingMode='server'
        sx={({ palette }) => ({
          height: 'calc(100vh - 60px)',
          '.MuiDataGrid-cell': {
            overflow: 'hidden !important',
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
