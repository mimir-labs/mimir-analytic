// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

export interface AccountData {
  id: number;
  address: HexString;
  name?: string | null;
  type: 'proxy' | 'multi';
  isMimir: boolean;
  raw: any;
  members: HexString[];
  threshold: number;
  delegators?: HexString[];
  creator?: HexString | null;
  createdHeight?: number | null;
  createdIndex?: number | null;
  networks: HexString[];
  txs: number;
  createdAt: Date;
  updatedAt: Date;
  dot_balance: string;
  dot_balance_usd: string;
  ksm_balance: string;
  ksm_balance_usd: string;
  total_usd: string;
}
