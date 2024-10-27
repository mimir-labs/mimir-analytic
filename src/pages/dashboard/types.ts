// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

export type NewAccountDaily = {
  time: string;
  counts: number;
  mimirCounts: number;
};

export type BalancesDaily = {
  time: string;
  dot_balance: string;
  dot_balance_usd: string;
  ksm_balance: string;
  ksm_balance_usd: string;
  total_usd: string;
};

export type TransactionsDaily = {
  time: string;
  counts: number;
  mimirCounts: number;
};

export type Daily = {
  time: string;
  counts: number;
  mimirCounts: number;
};
export type DailyWithChain = {
  genesisHash: HexString;
  time: string;
  counts: number;
  mimirCounts: number;
};
