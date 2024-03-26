// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

export enum CalldataStatus {
  Initialized = 0,
  Pending = 1,
  Success = 2,
  Failed = 3,
  MemberChanged = 4,
  Cancelled = 5
}

export interface TransactionData {
  id: number;
  address: HexString;
  name?: string | null;
  action?: string | null;
  calldataId: string;
  calldataUuid: string;
  genesisHash: HexString;
  callHash: HexString;
  status: CalldataStatus;
  blockTime: string;
  blockHeight?: number | null;
  extrinsicIndex?: number | null;
  website?: string | null;
  sendFromMimir: boolean;
  createdAt: string;
  updatedAt: string;
}
